'use client';

import { ButtonWithIcon } from '@/components/ButtonWithIcon';
import { useCallback, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const AuthForm = () => {
	const [variant, setVariant] = useState<'LOGIN' | 'REGISTER'>('REGISTER');
	const [googleIsLoading, setGoogleIsLoading] = useState(false);
	const [githubIsLoading, setGithubIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER');
		} else {
			setVariant('LOGIN');
		}
	}, [variant]);

	const socialAction = (provider: string) => {
		if (provider === 'google') {
			setGoogleIsLoading(true);
			console.log('google');
		}

		if (provider === 'github') {
			setGithubIsLoading(true);
			console.log('github');
		}
	};

	return (
		<form
			className="gap-4 flex flex-col mt-4 lg:mt-8 bg-white px-4 py-6 shadow rounded-lg sm:px-10 w-full sm:max-w-lg max-w-md"
			onSubmit={(e) => e.preventDefault()}
		>
			<ButtonWithIcon
				loading={googleIsLoading}
				disabled={googleIsLoading || githubIsLoading}
				type="button"
				className="w-full"
				icon={FaGoogle}
				label={variant === 'LOGIN' ? 'Continue with Google' : 'Create an account'}
				onClick={() => socialAction('google')}
			/>

			<ButtonWithIcon
				loading={githubIsLoading}
				disabled={googleIsLoading || githubIsLoading}
				type="button"
				className="w-full"
				icon={FaGithub}
				label={variant === 'LOGIN' ? 'Continue with Github' : 'Create an account'}
				onClick={() => socialAction('github')}
			/>

			<hr />

			<div className="flex gap-2 justify-center">
				{variant === 'LOGIN' ? 'New to Money Mapper?' : 'Already have an account?'}

				<button onClick={toggleVariant} className="underline cursor-pointer">
					{variant === 'LOGIN' ? 'Create an account' : 'Login'}
				</button>
			</div>
		</form>
	);
};

export default AuthForm;
