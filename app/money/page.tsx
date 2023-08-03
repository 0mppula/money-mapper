import PageContainer from '@/components/PageContainer';
import { TypographyH1 } from '@/components/TypographyH1';
import { mainAppDescription } from '@/constants';
import createAppTitle from '@/utils/createAppTitle';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: createAppTitle('Money'),
	description: mainAppDescription,
};

const Page = () => {
	return (
		<PageContainer>
			<TypographyH1 center>Money</TypographyH1>
		</PageContainer>
	);
};

export default Page;
