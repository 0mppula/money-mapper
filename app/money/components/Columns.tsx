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

export const columns: ColumnDef<z.infer<typeof creationSchema> & { id: string }>[] = [
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
		maxSize: 50,
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
		id: 'actions',
		enableHiding: false,
		cell: () => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuItem className="flex gap-2" onClick={() => {}}>
							<Edit2 className="h-[1.125rem] w-[1.125rem]" />
							<span>Edit</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							className="flex gap-2 focus:bg-destructive/25"
							onClick={() => {}}
						>
							<Trash2 className="h-[1.125rem] w-[1.125rem]" />
							<span>Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
