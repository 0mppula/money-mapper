'use client';

import { ButtonWithIcon } from '@/components/ButtonWithIcon';
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
import { useToast } from '@/components/ui/use-toast';
import { currencies } from '@/data/currencies';
import { cn } from '@/lib/utils';
import { creationSchema } from '@/schemas/financialRecord';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { format, isToday } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface CreateFinancialRecordFormProps {}

const CreateFinancialRecordForm = ({}: CreateFinancialRecordFormProps) => {
	const [formIsOpen, setFormIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { toast } = useToast();

	const form = useForm<z.infer<typeof creationSchema>>({
		resolver: zodResolver(creationSchema),
		defaultValues: {
			date: new Date(),
			currency: 'usd',
			grossIncomeYtd: 0,
			taxesPaidYtd: 0,
			assetsExCash: 0,
			cash: 0,
			debt: 0,
		},
	});

	const onSubmit = async (values: z.infer<typeof creationSchema>) => {
		setIsLoading(true);

		await axios
			.post('/api/financial-records', values)
			.then((res) => {
				toast({
					description: 'Record added successfully.',
				});

				setFormIsOpen(false);
			})
			.catch((err) => {
				toast({
					description:
						'Something went wrong while adding the record. Please try again later.',
					variant: 'destructive',
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="mt-4 lg:mt-8 flex flex-col">
			<Dialog open={formIsOpen} onOpenChange={() => setFormIsOpen((prev) => !prev)}>
				<DialogTrigger asChild>
					<Button className="place-self-end">Add record</Button>
				</DialogTrigger>

				<DialogContent className="max-w-2xl overflow-y-auto max-h-[calc(100vh-2rem)]">
					<DialogHeader>
						<DialogTitle className="mb-2">Add a new financial record</DialogTitle>
					</DialogHeader>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<div className="flex flex-col sm:flex-row gap-4">
								{/* Date field */}
								<FormField
									control={form.control}
									name="date"
									render={({ field }) => (
										<FormItem className="flex flex-col justify-between w-full">
											<FormLabel className="mt-[5px] w-full">
												Date of recording
											</FormLabel>

											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															className={cn(
																'w-100 pl-3 text-left font-normal',
																!field.value &&
																	'text-muted-foreground'
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

												<PopoverContent
													className="w-auto p-0"
													align="start"
												>
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
										<FormItem className="w-full">
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
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								{/* Gross income field */}
								<FormField
									control={form.control}
									name="grossIncomeYtd"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Gross income year-to-date</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="30000"
													{...field}
												/>
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
										<FormItem className="w-full">
											<FormLabel>Taxes paid year-to-date</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="15000"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="flex flex-col sm:flex-row gap-4">
								{/* Assets excluding cash field */}
								<FormField
									control={form.control}
									name="assetsExCash"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormLabel>Assets excluding cash</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="10000"
													{...field}
												/>
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
										<FormItem className="w-full">
											<FormLabel>Cash</FormLabel>
											<FormControl>
												<Input
													type="number"
													placeholder="10000"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

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

							<DialogFooter>
								<ButtonWithIcon loading={isLoading} type="submit">
									Add
								</ButtonWithIcon>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CreateFinancialRecordForm;
