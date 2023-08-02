'use client';

import { ButtonWithIcon } from '@/components/ButtonWithIcon';
import { useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const AuthForm = () => {
	const [googleIsLoading, setGoogleIsLoading] = useState(false);
	const [githubIsLoading, setGithubIsLoading] = useState(false);

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
		<form className="space-y-4 mt-4 lg:mt-8 bg-white px-4 py-6 shadow rounded-lg sm:px-10 w-full sm:max-w-lg max-w-md">
			<ButtonWithIcon
				loading={googleIsLoading}
				disabled={googleIsLoading || githubIsLoading}
				type="button"
				className="w-full"
				icon={FaGoogle}
				label="Continue with Google"
				onClick={() => socialAction('google')}
			/>

			<ButtonWithIcon
				loading={githubIsLoading}
				disabled={googleIsLoading || githubIsLoading}
				type="button"
				className="w-full"
				icon={FaGithub}
				label="Continue with Github"
				onClick={() => socialAction('github')}
			/>
		</form>
	);
};

export default AuthForm;
