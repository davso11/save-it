import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Hr,
} from '@react-email/components';

const PROTOCOL = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.VERCEL_URL
    : '127.0.0.1:3000';

export function ResetPasswordEmail({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  const URI = `${PROTOCOL}://${DOMAIN}/reset-password/${token}`;

  return (
    <Html lang="fr">
      <Tailwind>
        <Head />
        <Preview>Demande de réinitialisation du mot de passe - SaveIt</Preview>
        <Body style={main}>
          <Container className="mx-auto mb-8 bg-white p-5 pb-8">
            <Section className="p-0 md:p-12">
              <Text className="text-2xl font-bold leading-10">SaveIt</Text>
              <Hr className="my-3 border-t border-gray-200" />
              <Text className="text-base text-gray-700">
                Bonjour {username}, quelqu'un (espérons-le, vous) a demandé une
                réinitialisation du mot de passe associé à ce compte.
              </Text>
              <Text className="text-base text-gray-700">
                Si vous souhaitez le faire, veuillez cliquer sur le bouton
                suivant :
              </Text>
              <Button
                className="my-3 rounded-lg bg-slate-900 px-5 py-2.5 text-center text-white"
                href={URI}
              >
                Rénitialisez votre mot de passe
              </Button>
              <Hr className="my-3 border-t border-gray-200" />
              <Text className="text-base text-gray-700">
                Pour des raisons de sécurité, ce lien n'est disponible que
                pendant quatre (04) heures.
              </Text>
              <Text className="text-base text-gray-700">
                Si vous n'avez pas demandé cette réinitialisation, veuillez tout
                simplement ignorer cet e-mail.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
