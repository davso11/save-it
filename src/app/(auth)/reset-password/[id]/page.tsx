import { checkResetToken } from '~/actions';
import ResetPasswordForm from './reset-password-form';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
};

const Page = async ({ params: { id: token } }: Props) => {
  const response = await checkResetToken(token);

  return (
    <section>
      {response.ok ? (
        <ResetPasswordForm token={token} />
      ) : (
        <h1>Lien invalide</h1>
      )}

      <p className="mt-6 text-sm">
        Retour à la page de connexion{' '}
        <Link
          href="/sign-in"
          className="link"
        >
          ici
        </Link>
      </p>
    </section>
  );
};

export default Page;
