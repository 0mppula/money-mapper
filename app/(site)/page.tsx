import { TypographyH1 } from '@/components/TypographyH1';
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className="container flex flex-col items-center justify-start sm:justify-center pt-24 sm:pt-12 py-12 min-h-[calc(100vh-69px)] sm:pb-[117px]">
			<TypographyH1 center>Sign in to your account</TypographyH1>

			<AuthForm />
		</div>
	);
}
