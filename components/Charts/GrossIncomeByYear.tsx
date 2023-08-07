'use client';

import { useTheme } from 'next-themes';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import ChartContainer from './ChartContainer';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

const data = [
	{
		name: 'Jan',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Feb',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Mar',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Apr',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'May',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Jun',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Jul',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Aug',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Sep',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Oct',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Nov',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
	{
		name: 'Dec',
		total: Math.floor(Math.random() * 5000) + 1000,
	},
];

interface GrossIncomeByYearProps {}

const GrossIncomeByYear = ({}: GrossIncomeByYearProps) => {
	const { systemTheme, theme } = useTheme();
	const computedTheme = theme === 'system' ? systemTheme : theme;

	const CustomTooltip = ({
		active,
		payload,
		label,
	}: {
		active: boolean | undefined;
		payload: Payload<string | number | (string | number)[], string | number>[] | undefined;
		label: string;
	}) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-slate-50 dark:bg-slate-950 rounded-md p-3 border-slate-200 dark:border-slate-800 border">
					<p className="pb-1">{`${label}`}</p>
					<div>
						{payload.map((pld) => (
							// @ts-ignore
							<div style={{ color: pld.fill }}>
								{pld.dataKey}: ${pld.value}
							</div>
						))}
					</div>
				</div>
			);
		}

		return null;
	};

	return (
		<ChartContainer title="Gross Income By Year">
			<ResponsiveContainer width="100%" height={350}>
				<BarChart data={data}>
					<CartesianGrid
						stroke={computedTheme === 'dark' ? '#1e293b' : '#e2e8f0'}
						vertical={false}
					/>
					<XAxis
						dataKey="name"
						stroke={computedTheme === 'dark' ? '#f8fafc' : '#0f172a'}
						fontSize={12}
						tickLine={false}
						axisLine={{
							stroke: computedTheme === 'dark' ? '#1e293b' : '#e2e8f0',
						}}
					/>
					<YAxis
						stroke={computedTheme === 'dark' ? '#f8fafc' : '#1e293b'}
						fontSize={12}
						tickFormatter={(value) => `$${value}`}
						tickCount={10}
						axisLine={false}
						tickLine={false}
					/>
					<Bar
						dataKey="total"
						fill={computedTheme === 'dark' ? '#a3e635' : '#3f6212'}
						radius={[4, 4, 0, 0]}
					/>
					<Tooltip
						cursor={false}
						formatter={(value) => `$${value}`}
						content={({ active, payload, label }) => (
							<CustomTooltip active={active} payload={payload} label={label} />
						)}
					/>
				</BarChart>
			</ResponsiveContainer>
		</ChartContainer>
	);
};

export default GrossIncomeByYear;
