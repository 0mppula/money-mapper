import { getCurrencyLocale } from './currencyFns';

export const formatCurrency = (value: number, currency: string) => {
	let formatted;

	if (value === 0 || isNaN(value)) {
		switch (currency) {
			case 'eur':
				formatted = '0,00 €';
				break;
			case 'gbp':
				formatted = '£0.00';
				break;
			case 'jpy':
				formatted = '¥0.00';
				break;
			case 'inr':
				formatted = '₹0.00';
				break;
			default:
				formatted = '$0.00';
				break;
		}
	} else {
		formatted = new Intl.NumberFormat(getCurrencyLocale(currency), {
			style: 'currency',
			maximumFractionDigits: 2,
			currency,
		}).format(value);
	}

	return formatted;
};

export const formatCurrencyK = (value: number, locale = 'en-US', currency = 'usd') => {
	if (value === 0 || isNaN(value)) {
		let formatted = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			maximumFractionDigits: 0,
		}).format(0);

		return `${formatted}k`;
	} else {
		let formatted = new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			maximumFractionDigits: 0,
		}).format(value / 1000);

		return `${formatted}k`;
	}
};
