'use client';

import { formatCurrency, formatCurrencyK } from '@/utils/formatFns';
import { format } from 'date-fns';
import { useTheme } from 'next-themes';
import {
	Bar,
	BarChart as BarChartElement,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import ChartContainer from './ChartContainer';

interface BarChartProps {
	title: string;
	datasetCurrency: string;
	data: {
		x: Date;
		y: number;
		currency: string;
	}[];
}

const BarChart = ({ title, data, datasetCurrency }: BarChartProps) => {
	const { systemTheme, theme } = useTheme();
	const computedTheme = theme === 'system' ? systemTheme : theme;

	return (
		<ChartContainer title={title}>
			<ResponsiveContainer width="100%" height={350}>
				<BarChartElement data={data}>
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
						tickFormatter={(value) => `${formatCurrency(value, datasetCurrency, 0)}`}
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
				</BarChartElement>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default BarChart;
