import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';

interface ChartContainerProps {
	title: string;
	children: React.ReactNode;
	className?: string;
}

const ChartContainer = ({ title, children, className }: ChartContainerProps) => {
	return (
		<Card className={cn('col-span-1', className)}>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="pl-2">{children}</CardContent>
		</Card>
	);
};

export default ChartContainer;
