'use server';

import { z } from 'zod';
import { hash } from 'bcrypt';
import { TNewUserProps } from '~/lib/validators/user';
import { TNewContactProps } from './lib/validators/contact';
import { db } from '~/lib/db';
import { resend } from './lib/email';
import { ResetPasswordEmail } from '~/components/emails/reset-password';

export const createUser = async (
  data: TNewUserProps,
): Promise<{
  [x: string]: any;
  ok: boolean;
}> => {
  try {
    // verify email
    const userAlreadyExists = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw {
        ok: false,
        name: 'DuplicateEmailError',
        message: 'Email déjà utilisée',
      };
    }

    const hashedPassword = await hash(data.password, 10);

    await db.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return {
      ok: true,
    };
  } catch (e: any) {
    return {
      ok: false,
      name: e.name,
      message: e.message,
    };
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  try {
    // validate the incomming email
    const validEmail = await z
      .string()
      .min(1, { message: 'Email non-définie' })
      .email({ message: 'Email invalide' })
      .parseAsync(email);

    const user = await db.user
      .findUnique({
        where: {
          email: validEmail,
        },
      })
      .catch((e) => {
        e.status = 500;
        throw e;
      });

    if (!user) {
      throw {
        name: 'Error',
        message: 'Aucun utilisateur associé à cet email',
      };
    }

    const TOKEN = crypto.randomUUID();

    await db.passwordResetToken
      .create({
        data: {
          token: TOKEN,
          userId: user.id,
        },
      })
      .catch((e) => {
        e.status = 500;
        throw e;
      });

    const { data, error } = await resend.emails
      .send({
        from: 'SaveIt <onboarding@resend.dev>',
        to: [validEmail],
        subject: 'Demande de réinitialisation de mot de passe',
        react: ResetPasswordEmail({
          token: TOKEN,
          username: user.firstName.split(' ')[0] ?? user.lastName,
        }),
      })
      .catch((e) => {
        e.status = 500;
        throw e;
      });

    if (error) {
      throw error;
    }

    return {
      ok: true,
      ...data,
    };
  } catch (e: any) {
    return {
      ok: false,
      name: e.name,
      message: e.message,
      ...e,
    };
  }
};

export const checkResetToken = async (_token: string) => {
  try {
    const parsedToken = await z
      .string()
      .uuid({ message: 'Not UUID' })
      .parseAsync(_token);

    const token = await db.passwordResetToken
      .findUnique({
        where: {
          token: parsedToken,
          createdAt: {
            gt: new Date(Date.now() - 3600 * 4 * 1000),
          },
          resetAt: null,
        },
      })
      .catch((e) => {
        e.status = 500;
        throw e;
      });

    if (!token) {
      throw {
        name: 'BadTokenError',
        message: 'Mauvais token',
      };
    }

    return {
      ok: true,
    };
  } catch (e: any) {
    return {
      ok: false,
      name: e.name,
      message: e.message,
      ...e,
    };
  }
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  try {
    const parsedData = await z
      .object({
        token: z.string().uuid({ message: 'Not UUID' }),
        password: z
          .string()
          .min(4, {
            message: 'Le mot de passe doit contenir au moins 04 caractères',
          })
          .max(255, { message: 'Mot de passe trop long' }),
      })
      .parseAsync(data);

    const token = await db.passwordResetToken.findUnique({
      where: {
        token: parsedData.token,
      },
      select: {
        user: true,
      },
    });

    if (!token || !token.user) {
      throw {
        name: 'Error',
        message: 'Aucun utilisateur trouvé.',
      };
    }

    const hashedPassword = await hash(parsedData.password, 10);

    const updatedUser = await db.user.update({
      where: {
        id: token.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await db.passwordResetToken.update({
      where: {
        token: parsedData.token,
      },
      data: {
        resetAt: new Date(),
      },
    });

    return {
      ok: true,
      user: {
        id: updatedUser,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      },
    };
  } catch (e: any) {
    return {
      ok: false,
      name: e.name,
      message: e.message,
      ...e,
    };
  }
};

export const addContact = async (data: TNewContactProps) => {
  // TODO: ...
};
