'use client';

import { formatCurrency, formatCurrencyK } from '@/utils/formatFns';
import { format } from 'date-fns';
import { useTheme } from 'next-themes';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartContainer from './ChartContainer';

interface GrossIncomeByYearProps {
	datasetCurrency: string;
	data: {
		x: Date;
		y: number;
		currency: string;
	}[];
}

const GrossIncomeByYear = ({ data, datasetCurrency }: GrossIncomeByYearProps) => {
	const { systemTheme, theme } = useTheme();
	const computedTheme = theme === 'system' ? systemTheme : theme;

	return (
		<ChartContainer title="Gross Income By Year">
			<ResponsiveContainer width="100%" height={350}>
				<BarChart data={data}>
					<CartesianGrid
						stroke={computedTheme === 'dark' ? '#1e293b' : '#e2e8f0'}
						vertical={false}
					/>
					<XAxis
						dataKey="x"
						stroke={computedTheme === 'dark' ? '#f8fafc' : '#0f172a'}
						fontSize={12}
						tickFormatter={(value) => `${format(value, 'MM/dd')}`}
						tickLine={false}
						axisLine={{
							stroke: computedTheme === 'dark' ? '#1e293b' : '#e2e8f0',
						}}
					/>
					<YAxis
						stroke={computedTheme === 'dark' ? '#f8fafc' : '#1e293b'}
						fontSize={12}
						tickFormatter={(value) => `${formatCurrencyK(value, datasetCurrency)}`}
						tickCount={9}
						axisLine={false}
						tickLine={false}
					/>
					<Bar
						dataKey="y"
						fill={computedTheme === 'dark' ? '#a3e635' : '#3f6212'}
						radius={[4, 4, 0, 0]}
					/>
					<Tooltip
						cursor={false}
						separator=": "
						labelFormatter={(value) => `${format(value, 'MM/dd/yyyy')}`}
						formatter={(value: number, _, props) => {
							const formattedValue = formatCurrency(value, props.payload.currency);

							return [formattedValue];
						}}
						contentStyle={{
							borderRadius: '6px',
							backgroundColor: computedTheme === 'dark' ? '#020617' : '#fff',
							border:
								computedTheme === 'dark'
									? '1px solid #1e293b'
									: '1px solid #e2e8f0',
						}}
					/>
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default GrossIncomeByYear;
