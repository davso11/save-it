import Link from 'next/link';
import { SignUpForm } from './sign-up-form';

const SignUpPage = () => {
  return (
    <section>
      {/* FORM */}
      <SignUpForm />

      <p className="mt-6 text-sm">
        Déjà inscrit(e) ? Connectez-vous{' '}
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

export default SignUpPage;
