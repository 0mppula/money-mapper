import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const ExportDataButton = () => {
	return (
		<Button variant="outline">
			<Download className="h-[1.125rem] w-[1.125rem] mr-2" /> .csv
			<span className="sr-only">Export data as csv</span>
		</Button>
	);
};

export default ExportDataButton;
