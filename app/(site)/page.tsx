import { TypographyH1 } from '@/components/TypographyH1';
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className="container flex min-h-full flex-col justify-center py-12 items-center">
			<TypographyH1 center>Sign in or create an account </TypographyH1>

			<AuthForm />
		</div>
	);
}
