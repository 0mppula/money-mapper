'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { currencies } from '@/data/currencies';
import { cn } from '@/lib/utils';
import { formSchema } from '@/schemas/financialRecordForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, isToday } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface CreateFinancialRecordFromProps {}

const CreateFinancialRecordFrom = ({}: CreateFinancialRecordFromProps) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			date: new Date('2025-01-01'),
			currency: 'usd',
			grossIncomeYtd: 0,
			taxesPaidYtd: 0,
			assetsExCash: 0,
			cash: 0,
			debt: 0,
		},
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<div className="mt-4 lg:mt-8 flex flex-col">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="place-self-end">Add record</Button>
				</DialogTrigger>

				<DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[calc(100vh-2rem)]">
					<DialogHeader>
						<DialogTitle className="mb-2">Add a new financial record</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							{/* Date field */}
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel className="mb-[2px]">
											Date of recording
										</FormLabel>

										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={'outline'}
														className={cn(
															'w-100 pl-3 text-left font-normal',
															!field.value && 'text-muted-foreground'
														)}
													>
														{field.value ? (
															format(field.value, 'PPP')
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className="w-auto p-0" align="start">
												<Calendar
													mode="single"
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date) =>
														date < new Date() && !isToday(date)
													}
												/>
											</PopoverContent>
										</Popover>

										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Currency field */}
							<FormField
								control={form.control}
								name="currency"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Currency</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select your currency" />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												{currencies.map((currency) => (
													<SelectItem
														key={currency.name}
														value={currency.value}
													>
														{currency.name} {currency.symbol}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Gross income field */}
							<FormField
								control={form.control}
								name="grossIncomeYtd"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gross income year-to-date</FormLabel>
										<FormControl>
											<Input type="number" placeholder="30000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Taxes paid field */}
							<FormField
								control={form.control}
								name="taxesPaidYtd"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Taxes paid year-to-date</FormLabel>
										<FormControl>
											<Input type="number" placeholder="15000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Assets excluding cash field */}
							<FormField
								control={form.control}
								name="assetsExCash"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Assets excluding cash</FormLabel>
										<FormControl>
											<Input type="number" placeholder="10000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Cash field */}
							<FormField
								control={form.control}
								name="cash"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cash</FormLabel>
										<FormControl>
											<Input type="number" placeholder="10000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Debt field */}
							<FormField
								control={form.control}
								name="debt"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Debt</FormLabel>
										<FormControl>
											<Input type="number" placeholder="10000" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogFooter className="mt-[1rem!important]">
								<Button type="submit">Submit</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateFinancialRecordFrom;
