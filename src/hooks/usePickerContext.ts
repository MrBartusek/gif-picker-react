import { Dispatch, SetStateAction, useState } from 'react';

export interface PickerContextType {
	searchTerm: string;
	showTrending: boolean;
	initialSearchTerm: string;
}

export type PickerContextSettings = {
	initialSearchTerm: string;
}

function usePickerContext(props: PickerContextSettings): [PickerContextType, Dispatch<SetStateAction<PickerContextType>>] {
	const DEFAULT_SETTINGS: PickerContextType = {
		initialSearchTerm: props.initialSearchTerm,
		searchTerm: '',
		showTrending: false
	};

	const [pickerContext, setPickerContext] = useState<PickerContextType>(DEFAULT_SETTINGS);

	return [pickerContext, setPickerContext];
}

export default usePickerContext;
