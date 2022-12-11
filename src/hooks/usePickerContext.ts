import { Dispatch, SetStateAction, useState } from 'react';

export interface PickerContextType {
    searchTerm: string;
}

function usePickerContext(): [PickerContextType, Dispatch<SetStateAction<PickerContextType>>] {
    const DEFAULT_SETTINGS: PickerContextType = {
        searchTerm: 'patrick bateman'
    }

	const [ pickerContext, setPickerContext ] = useState<PickerContextType>(DEFAULT_SETTINGS);

	return [ pickerContext, setPickerContext ];
}

export default usePickerContext;
