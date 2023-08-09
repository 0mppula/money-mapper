import Link from 'next/link';
import React from 'react';

const Footer = () => {
	return (
		<footer className="w-full pt-20 pb-8 text-center border-slate-200 dark:border-slate-800 border-t-2 bg-white/75 dark:bg-slate-950/75">
			<span>Developed By: </span>
			<Link
				href="https://github.com/0mppula"
				target="_blank"
				rel="noopener noreferrer"
				className="active:decoration-lime-800 active:decoration-dashed dark:active:decoration-lime-400 underline"
			>
				Omar Kraidié
			</Link>
		</footer>
	);
};

export default Footer;
