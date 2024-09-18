import { Dispatch, SetStateAction, useState } from 'react';

export interface PickerContextType {
    searchTerm: string;
	showTrending: boolean
}

function usePickerContext(initialSearchTerm: string): [PickerContextType, Dispatch<SetStateAction<PickerContextType>>] {
	const DEFAULT_SETTINGS: PickerContextType = {
		searchTerm: initialSearchTerm,
		showTrending: false
	};

	const [ pickerContext, setPickerContext ] = useState<PickerContextType>(DEFAULT_SETTINGS);

	return [ pickerContext, setPickerContext ];
}

export default usePickerContext;
