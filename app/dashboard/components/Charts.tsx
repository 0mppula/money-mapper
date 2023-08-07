'use client';

import { getFinancialRecords } from '@/app/money/components/FinancialRecordTable';
import BarChart from '@/components/Charts/BarChart';
import { ChartData } from '@/types/chart-data';
import getMostCommonElement from '@/utils/getMostCommonElement';
import { getPreferredCurrency } from '@/utils/localStorageFns';
import { FinancialRecord } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import ChartGroupSeperator from './ChartGroupSeperator';

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
			currency: [],
			datasetCurrency: getPreferredCurrency(),
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
			const currency = record.currency;

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
			chartData.currency.push(currency);
		});

		chartData.datasetCurrency = getMostCommonElement(chartData.currency);

		return chartData;
	}, [data]);

	const generateTableData = (
		category: Exclude<keyof ChartData, 'currency' | 'dates' | 'datasetCurrency'>
	) => {
		const dates = chartDataByDate.dates;

		const tableData = dates.map((date, index) => {
			const value = chartDataByDate[category][index];
			const currency = chartDataByDate.currency[index];

			return { x: date, y: value, currency };
		});

		return tableData;
	};

	const { datasetCurrency } = chartDataByDate;

	if (isLoading) {
		return <div>Loading...</div>;
	} else if (isError) {
		return <div>Error loading financial records.</div>;
	} else if (!data?.length) {
		return <div>You dont have any financial records yet. Create one! 📈</div>;
	}

	return (
		<div className="mt-12">
			<ChartGroupSeperator title="Salary & Taxes" />
			{/* grossIncomeByDate & TaxesByYtdDate  */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<BarChart
					title="Gross Income Year-to-Date"
					data={generateTableData('grossIncomeYtd')}
					datasetCurrency={datasetCurrency}
				/>

				<BarChart
					title="Taxes Paid Year-to-Date"
					data={generateTableData('taxesPaidYtd')}
					datasetCurrency={datasetCurrency}
				/>
			</div>

			<ChartGroupSeperator title="Assets & Cash" />

			{/* totalAssetsAndCashByDate (side by side)  & totalAssetsByDate*/}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<BarChart
					title="Total cash"
					data={generateTableData('cash')}
					datasetCurrency={datasetCurrency}
				/>

				<BarChart
					title="Total Assets"
					data={generateTableData('totalAssets')}
					datasetCurrency={datasetCurrency}
				/>

				<div className="bg-muted w-full h-16 rounded-sm md:col-span-2"></div>
			</div>

			<ChartGroupSeperator title="Debt" />

			{/* totalDebtByDate & TotalDebtToTotalAssetsByDate (ratio) & TotalDebtToNetWorthByDate (ratio) */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<BarChart
					title="Total Debt"
					data={generateTableData('debt')}
					datasetCurrency={datasetCurrency}
				/>

				<div className="bg-muted w-full h-16 rounded-sm"></div>
				<div className="bg-muted w-full h-16 rounded-sm md:col-span-2"></div>
			</div>

			<ChartGroupSeperator title="Net Worth" />

			{/* NetWorthByDate & AssetsCashAndTotalDebtByDate (side by side) */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
				<BarChart
					title="Net Worth"
					data={generateTableData('netWorth')}
					datasetCurrency={datasetCurrency}
				/>

				<div className="bg-muted w-full h-16 rounded-sm"></div>
			</div>
		</div>
	);
};

export default Charts;
