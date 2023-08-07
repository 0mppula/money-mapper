import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ChartContainerProps {
	title: string;
	children: React.ReactNode;
}

const ChartContainer = ({ title, children }: ChartContainerProps) => {
	return (
		<div>
			<Card className="col-span-4">
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent className="pl-2">{children}</CardContent>
			</Card>
		</div>
	);
};

export default ChartContainer;
