import Nav from '@/components/Nav/Nav';
import NextSessionProvider from '@/components/providers/NextSessionProvider';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Money Mapper',
	description:
		'Take control of your finances with Money Mapper, the ultimate app to track & manage your money. Visualize your income, expenses, assets, and debts in one place.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={cn(inter.className, 'antialiased')} lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-slate-100 dark:bg-slate-950 antialiased pt-[68px] pb-16">
				<NextSessionProvider>
					<Nav />

					{children}
				</NextSessionProvider>
			</body>
		</html>
	);
}
