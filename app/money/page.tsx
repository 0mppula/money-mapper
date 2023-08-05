import PageContainer from '@/components/PageContainer';
import { TypographyH1 } from '@/components/TypographyH1';
import { mainAppDescription } from '@/constants';
import createAppTitle from '@/utils/createAppTitle';
import { Metadata } from 'next';
import { columns } from './components/Columns';
import CreateFinancialRecordForm from './components/CreateFinancialRecordForm';
import { FinancialRecordTable } from './components/FinancialRecordTable';

export const metadata: Metadata = {
	title: createAppTitle('Money'),
	description: mainAppDescription,
};

const Page = async () => {
	return (
		<PageContainer>
			<TypographyH1 center>Money</TypographyH1>

			<CreateFinancialRecordForm />

			<FinancialRecordTable columns={columns} />
		</PageContainer>
	);
};

export default Page;
