'use client';

import { getFinancialRecords } from '@/app/money/components/FinancialRecordTable';
import { ChartData } from '@/types/chart-data';
import { FinancialRecord } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ChartGroupSeperator from './ChartGroupSeperator';
import GrossIncomeByYear from '@/components/Charts/GrossIncomeByYear';

interface ChartsProps {}

const Charts = ({}: ChartsProps) => {
	const { data, isLoading, isError } = useQuery<(FinancialRecord & { netWorth: number })[]>({
		queryKey: ['financial-records'],
		queryFn: getFinancialRecords,
	});

	// grossIncomeByDate
	const chartDataByDate = useMemo(() => {
		const chartData: ChartData = {
			dates: [],
			grossIncomeYtd: [],
			taxesPaidYtd: [],
			assetsExCash: [],
			cash: [],
			totalAssets: [],
			debt: [],
			netWorth: [],
			debtToTotalAssets: [],
			debtToNetWorth: [],
		};

		const sortedData = [...(data || [])].sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		sortedData.forEach((record) => {
			const date = new Date(record.date);
			const grossIncomeYtd = record.grossIncomeYtd;
			const taxesPaidYtd = record.taxesPaidYtd;
			const assetsExCash = record.assetsExCash;
			const cash = record.cash;
			const totalAssets = assetsExCash + cash;
			const debt = record.debt;
			const netWorth = totalAssets - debt;
			const debtToTotalAssets = totalAssets !== 0 ? debt / totalAssets : 0;
			const debtToNetWorth = netWorth !== 0 ? debt / netWorth : 0;

			chartData.dates.push(date);
			chartData.grossIncomeYtd.push(grossIncomeYtd);
			chartData.taxesPaidYtd.push(taxesPaidYtd);
			chartData.assetsExCash.push(assetsExCash);
			chartData.cash.push(cash);
			chartData.debt.push(debt);
			chartData.totalAssets.push(totalAssets);
			chartData.netWorth.push(netWorth);
			chartData.debtToTotalAssets.push(debtToTotalAssets);
			chartData.debtToNetWorth.push(debtToNetWorth);
		});

		return chartData;
	}, [data]);

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (isError) {
		return <div>Error loading financial records.</div>;
	} else if (!data?.length) {
		return <div>You dont have any financial records yet. Create one! 📈</div>;
	}

	console.table(chartDataByDate);

	return (
		<div className="mt-12">
			<ChartGroupSeperator title="Salary & Taxes" />
			{/* grossIncomeByDate & TaxesByYtdDate */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<GrossIncomeByYear />
				<div className="bg-muted w-full h-16 rounded-sm"></div>
			</div>

			<ChartGroupSeperator title="Assets & Cash" />

			{/* totalAssetsAndCashByDate (side by side)  & totalAssetsByDate*/}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<div className="bg-muted w-full h-16 rounded-sm"></div>
				<div className="bg-muted w-full h-16 rounded-sm"></div>
			</div>

			<ChartGroupSeperator title="Debt" />

			{/* totalDebtByDate & TotalDebtToTotalAssetsByDate & TotalDebtToNetWorthByDate*/}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<div className="bg-muted w-full h-16 rounded-sm"></div>
				<div className="bg-muted w-full h-16 rounded-sm"></div>
				<div className="bg-muted w-full h-16 rounded-sm col-span-2"></div>
			</div>

			<ChartGroupSeperator title="Net Worth" />

			{/* NetWorthByDate & AssetsCashAndTotalDebtByDate */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<div className="bg-muted w-full h-16 rounded-sm"></div>
				<div className="bg-muted w-full h-16 rounded-sm"></div>
			</div>
		</div>
	);
};

export default Charts;
