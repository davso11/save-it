import { z } from 'zod';
import { asOptionalField } from './empty-to-undefined';

export const newContactSchema = z.object({
  firstName: z.string().min(1, { message: 'Champ obligatoire' }),
  lastName: z.string().min(1, { message: 'Champ obligatoire' }),
  phone: z
    .string()
    .min(4, { message: 'Il faut au moins 04 caractères' })
    .max(15, {
      message: 'Numéro trop long',
    }),
  email: asOptionalField(
    z.string().email({ message: 'Email invalide' }).optional(),
  ),
  isWhatsApp: z.boolean(),
});

export type TNewContactProps = z.infer<typeof newContactSchema>;

export const contactSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email().nullable(),
  isWhatsApp: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string(),
});

export type TContact = z.infer<typeof contactSchema>;
