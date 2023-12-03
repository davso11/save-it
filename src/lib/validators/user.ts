import { z } from 'zod';

export const newUserSchema = z.object({
  firstName: z.string().min(1, { message: 'Champ obligatoire' }),
  lastName: z.string().min(1, { message: 'Champ obligatoire' }),
  email: z
    .string()
    .min(1, { message: 'Email obligatoire' })
    .email({ message: 'Email invalide' }),
  password: z
    .string()
    .min(4, { message: 'Le mot de passe doit contenir au moins 04 caractères' })
    .max(255, { message: 'Mot de passe trop long' }),
});

export type TNewUserProps = z.infer<typeof newUserSchema>;

export const credentialSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email obligatoire' })
    .email({ message: 'Email invalide' }),
  password: z
    .string()
    .min(4, { message: 'Le mot de passe doit contenir au moins 04 caractères' })
    .max(255, { message: 'Mot de passe trop long' }),
});

export type TCredentialProps = z.infer<typeof credentialSchema>;
