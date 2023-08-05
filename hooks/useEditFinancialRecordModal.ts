import { create } from 'zustand';

interface useEditFinancialRecordModalStore {
	isOpen: boolean;
	setIsOpen: (state: boolean | ((prevState: boolean) => boolean)) => void;
}

const useEditFinancialRecordModal = create<useEditFinancialRecordModalStore>((set) => ({
	isOpen: false,
	setIsOpen: (value) =>
		set((state) =>
			typeof value === 'function' ? { isOpen: value(state.isOpen) } : { isOpen: value }
		),
}));

export default useEditFinancialRecordModal;
