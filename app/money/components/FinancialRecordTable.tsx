'use client';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { creationSchema } from '@/schemas/financialRecord';
import { useQuery } from '@tanstack/react-query';
import {
	ColumnDef,
	SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { useState } from 'react';
import { z } from 'zod';

const getFinancialRecords = async () => {
	try {
		const response = await axios.get(`/api/financial-records`);
		const data = await response.data;

		return data.data;
	} catch (err) {
		console.log(err);
	}
};

interface FinancialRecordTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
}

export function FinancialRecordTable<TData, TValue>({
	columns,
}: FinancialRecordTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const { data, isLoading, isError } = useQuery({
		queryKey: ['financial-records'],
		queryFn: getFinancialRecords,
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			sorting,
		},
	});

	const getColWidthStyles = (
		columnId: keyof (z.infer<typeof creationSchema> & { actions: string })
	) => {
		switch (columnId) {
			case 'date':
				return '!w-[128px] !min-w-[112px]';
			case 'grossIncomeYtd':
				return '!w-[180px] !min-w-[192px]';
			case 'taxesPaidYtd':
				return '!w-[160px] !min-w-[176px]';
			case 'assetsExCash':
				return '!w-[160px] !min-w-[160px]';
			case 'cash':
				return '!w-[128px] !min-w-[96px]';
			case 'debt':
				return '!w-[128px] !min-w-[96px]';
			case 'actions':
				return '!w-[56px]';
			default:
				return 'auto';
		}
	};

	return (
		<div className="rounded-md border mt-4">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id} className="p-0">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{!isLoading && table.getRowModel()?.rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => {
									return (
										<TableCell
											key={cell.id}
											className={getColWidthStyles(
												cell.column.id as keyof (z.infer<
													typeof creationSchema
												> & { actions: string })
											)}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns?.length} className="h-24 text-center">
								{isLoading
									? 'Loading...'
									: isError
									? 'Error loading financial records.'
									: 'You dont have any financial records yet. Create one! 📈'}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
