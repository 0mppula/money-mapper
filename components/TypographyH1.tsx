import { cn } from '@/lib/utils';

interface TypographyH1Props {
	children: React.ReactNode;
	center?: boolean;
}

export function TypographyH1({ children, center }: TypographyH1Props) {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
				center && 'text-center'
			)}
		>
			{children}
		</h1>
	);
}
