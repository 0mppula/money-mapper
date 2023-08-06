import { TypographyH1 } from '@/components/TypographyH1';
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className="container flex min-h-full flex-col items-center justify-start sm:justify-center py-12">
			<TypographyH1 center>Sign in to your account</TypographyH1>

			<AuthForm />
		</div>
	);
}
