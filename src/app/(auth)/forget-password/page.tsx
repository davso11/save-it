import Link from 'next/link';
import { ForgetPasswordForm } from './forget-password-form';

const ForgetPasswordPage = () => {
  return (
    <section>
      {/* FORM */}
      <ForgetPasswordForm />

      <p className="mt-6 text-sm">
        Pas encore membre ? Inscrivez-vous{' '}
        <Link
          href="/sign-up"
          className="link"
        >
          ici
        </Link>
      </p>
    </section>
  );
};

export default ForgetPasswordPage;
