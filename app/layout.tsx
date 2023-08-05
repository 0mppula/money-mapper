import Nav from '@/components/Nav/Nav';
import NextSessionProvider from '@/components/providers/NextSessionProvider';
import { mainAppDescription } from '@/constants';
import { cn } from '@/lib/utils';
import createAppTitle from '@/utils/createAppTitle';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: createAppTitle('Sign in'),
	description: mainAppDescription,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={cn(inter.className, 'antialiased')} lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-slate-100 dark:bg-slate-950 antialiased pt-[68px] pb-16">
				<NextSessionProvider>
					<Nav />

					{children}

					<Toaster />
				</NextSessionProvider>
			</body>
		</html>
	);
}