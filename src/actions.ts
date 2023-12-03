'use server';

import { hash } from 'bcrypt';
import { TNewUserProps } from '~/lib/validators/user';
import { TNewContactProps } from './lib/validators/contact';
import { db } from '~/lib/db';

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

export const addContact = async (data: TNewContactProps) => {
  // TODO: ...
};
