'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { creationSchema } from '@/schemas/financialRecord';
import { getCurrencyLocale } from '@/utils/currencyFns';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import { z } from 'zod';
import FinancialRecordControls from './FinancialRecordControls';

export const columns: ColumnDef<
	z.infer<typeof creationSchema> & { id: string; netWorth: number }
>[] = [
	{
		accessorKey: 'date',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Date
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date: Date = new Date(row.getValue('date'));
			const formatted = format(date, 'dd/MM/yyyy');

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'grossIncomeYtd',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Gross Income YTD
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const currency = row.original.currency;
			const amount = parseFloat(row.getValue('grossIncomeYtd'));
			const formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
				style: 'currency',
				currency: currency,
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'taxesPaidYtd',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Taxes Paid YTD
					<CaretSortIcon className="ml-2 !h-4 !w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const currency = row.original.currency;
			const amount = parseFloat(row.getValue('taxesPaidYtd'));
			const formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
				style: 'currency',
				currency: currency,
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'assetsExCash',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Assets Ex Cash
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const currency = row.original.currency;
			const amount = parseFloat(row.getValue('assetsExCash'));
			const formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
				style: 'currency',
				currency: currency,
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'cash',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Cash
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const currency = row.original.currency;
			const amount = parseFloat(row.getValue('cash'));
			const formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
				style: 'currency',
				currency: currency,
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'debt',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Debt
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const currency = row.original.currency;
			const amount = parseFloat(row.getValue('debt'));
			const formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
				style: 'currency',
				currency: currency,
			}).format(amount);

			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: 'netWorth',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Net Worth
					<CaretSortIcon className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const currency = row.original.currency;
			const amount = parseFloat(row.getValue('netWorth'));
			const red = 'text-red-500';
			const green = 'text-green-500';

			const formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
				style: 'currency',
				currency: currency,
			}).format(amount);

			return <div className={amount > 0 ? green : amount !== 0 ? red : ''}>{formatted}</div>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const financialRecord = row.original;

			return <FinancialRecordControls financialRecord={financialRecord} />;
		},
	},
];
