'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
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
import { Alert } from '~/components/ui/alert';
import { resetPassword } from '~/actions';

const schema = z.object({
  password: z
    .string()
    .min(4, { message: 'Le mot de passe doit contenir au moins 04 caractères' })
    .max(255, { message: 'Mot de passe trop long' }),
});

type TSchema = z.infer<typeof schema>;

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: '',
    },
  });

  const submitHandler = async ({ password }: TSchema) => {
    setPending(true);
    setError(null);
    setSuccess(null);

    const res = await resetPassword({ token, password });
    setPending(false);

    if (!res.ok) {
      return setError(res.message);
    }

    setSuccess(
      'Mot de passe réinitialisé. Vous serez rédirigé vers la page de connexion',
    );
    setTimeout(() => {
      router.push('/sign-in');
    }, 5000);
  };

  return (
    <Form {...form}>
      <div className="mb-6 space-y-1">
        <h2 className="title">Rénitialisez votre mot de passe</h2>
        <p className="desc">Lorem ipsum dolor sit.</p>
      </div>
      <form
        autoComplete="off"
        className="flex flex-col gap-y-6"
        onSubmit={form.handleSubmit(submitHandler)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Nouveau mot de passe</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <div className="flex gap-x-2">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      disabled={pending}
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      className="shrink-0"
                      onClick={() => setShowPassword((c) => !c)}
                      disabled={pending}
                    >
                      {showPassword ? (
                        <Eye
                          size={20}
                          className="cursor-pointer"
                        />
                      ) : (
                        <EyeOff
                          size={20}
                          className="cursor-pointer"
                        />
                      )}
                    </Button>
                  </div>
                </div>
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
          Confirmer
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
