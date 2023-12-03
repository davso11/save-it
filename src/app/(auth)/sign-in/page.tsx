import Link from 'next/link';
import { SignInForm } from './sign-in-form';

const SignInPage = () => {
  return (
    <section>
      {/* FORM */}
      <SignInForm />

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

export default SignInPage;
