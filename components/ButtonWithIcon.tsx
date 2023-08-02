import { Button, ButtonProps } from '@/components/ui/button';
import { IconType } from 'react-icons';
import { ImSpinner8 } from 'react-icons/im';

interface ButtonWithIconProps extends ButtonProps {
	icon: IconType;
	label: string;
	loading?: boolean;
}

export function ButtonWithIcon({ icon: Icon, label, loading, ...props }: ButtonWithIconProps) {
	return (
		<Button {...props} disabled={loading || props.disabled}>
			{label}{' '}
			{loading ? (
				<ImSpinner8 className="ml-2 h-4 w-4 animate-spin" />
			) : (
				<Icon className="ml-2 h-4 w-4" />
			)}
		</Button>
	);
}
