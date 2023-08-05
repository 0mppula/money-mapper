import PageContainer from '@/components/PageContainer';
import { TypographyH1 } from '@/components/TypographyH1';
import { mainAppDescription } from '@/constants';
import createAppTitle from '@/utils/createAppTitle';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { columns } from './components/Columns';
import { FinancialRecordTable } from './components/FinancialRecordTable';
import CreateFinancialRecordForm from './components/CreateFinancialRecordForm';

export const metadata: Metadata = {
	title: createAppTitle('Money'),
	description: mainAppDescription,
};

const Page = async () => {
	const getFinancialRecords = async () => {
		try {
			const response = await fetch(`${process.env.BASE_URL}/api/financial-records`, {
				method: 'GET',
				headers: headers(),
			});
			const data = await response.json();

			return data.data;
		} catch (err) {
			console.log(err);
		}
	};

	const records = (await getFinancialRecords()) || [];

	return (
		<PageContainer>
			<TypographyH1 center>Money</TypographyH1>

			<pre>{JSON.stringify(records)} </pre>

			<CreateFinancialRecordForm />

			<FinancialRecordTable columns={columns} data={records} />
		</PageContainer>
	);
};

export default Page;
