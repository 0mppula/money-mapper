import { Payload } from 'recharts/types/component/DefaultTooltipContent';

interface CustomTooltipProps {
	active: boolean | undefined;
	payload: Payload<string | number | (string | number)[], string | number>[] | undefined;
	label: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div className="bg-white dark:bg-slate-950 rounded-md p-3 border-slate-200 dark:border-slate-800 border">
				<p className="pb-1">{`${label}`}</p>
				<div>
					{payload.map((pld) => (
						// @ts-ignore
						<div style={{ color: pld.fill }}>
							{pld.dataKey}: ${pld.value}
						</div>
					))}
				</div>
			</div>
		);
	}

	return null;
};

export default CustomTooltip;
