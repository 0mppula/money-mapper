'use client';
import { Button } from '@/components/ui/button';
import { FinancialRecord } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Download } from 'lucide-react';
import { getFinancialRecords } from './FinancialRecordTable';

const ExportDataButton = () => {
	const { data, isLoading, isError } = useQuery<
		(FinancialRecord & { netWorth: number; totalAssets: number })[]
	>({
		queryKey: ['financial-records'],
		queryFn: getFinancialRecords,
	});

	return (
		<Button disabled={isLoading || isError} variant="outline">
			<Download className="h-[1.125rem] w-[1.125rem] mr-2" /> .csv
			<span className="sr-only">Export data as csv</span>
		</Button>
	);
};

export default ExportDataButton;
