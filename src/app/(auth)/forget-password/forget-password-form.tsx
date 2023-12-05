'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { sendResetPasswordEmail } from '~/actions';
import { Alert } from '~/components/ui/alert';

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email obligatoire' })
    .email({ message: 'Email invalide (Ex: example@mail.com)' }),
});

type TSchema = z.infer<typeof schema>;

export const ForgetPasswordForm = () => {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const submitHandler = async ({ email }: TSchema) => {
    setPending(true);
    setSuccess(null);
    setError(null);

    const response = await sendResetPasswordEmail(email);
    setPending(false);
    if (!response.ok) {
      return setError(
        response.status ? 'Erreur interne du serveur' : response.message,
      );
    }
    setSuccess('Lien envoyé. Consultez votre boîte de réception');
  };

  return (
    <Form {...form}>
      <div className="mb-6 space-y-1">
        <h2 className="title">Mot de passe oublié ?</h2>
        <p className="desc">
          Un lien de réinitialisation vous sera envoyé par email
        </p>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={pending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error ? (
          <Alert
            variant="error"
            message={error}
          />
        ) : null}
        {success ? (
          <Alert
            variant="success"
            message={success}
          />
        ) : null}
        <Button
          type="submit"
          disabled={pending}
        >
          Continuer
        </Button>
      </form>
    </Form>
  );
};
