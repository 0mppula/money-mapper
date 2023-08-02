import { cn } from '@/lib/utils';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Money Mapper',
	description:
		'Take control of your finances with Money Mapper, the ultimate app to track & manage your money. Visualize your income, expenses, assets, and debts in one place.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={cn(inter.className, 'antialiased')} lang="en">
			<body className="min-h-screen bg-gray-100 dark:bg-slate-900 antialiased">
				{children}
			</body>
		</html>
	);
}
