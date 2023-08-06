'use client';

import { getFinancialRecords } from '@/app/money/components/FinancialRecordTable';
import GrossIncomeByYear from '@/components/Charts/GrossIncomeByYear';
import { FinancialRecord } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

interface ChartsProps {}

const Charts = ({}: ChartsProps) => {
	const { data, isLoading, isError } = useQuery<(FinancialRecord & { netWorth: number })[]>({
		queryKey: ['financial-records'],
		queryFn: getFinancialRecords,
	});

	const dates = useMemo(() => {
		return data?.map((record) => new Date(record.date));
	}, [data]);

	// grossIncomeByDate
	const grossIncomeYtdByDate = useMemo(() => {
		return data?.map((record) => record.grossIncomeYtd);
	}, [data]);

	// TaxesByYtdDate

	// totalAssetsAndCashByDate (side by side)
	// totalAssetsByDate

	// totalDebtByDate
	// TotalDebtToTotalAssetsByDate
	// TotalDebtToNetWorthByDate

	// NetWorthByDate
	// AssetsCashAndTotalDebtByDate

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="mt-8">
			<pre> {JSON.stringify(dates)}</pre>
			<pre> {JSON.stringify(grossIncomeYtdByDate)}</pre>

			<GrossIncomeByYear />
		</div>
	);
};

export default Charts;
