import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export interface PickerContextType {
    searchTerm: string;
	showTrending: boolean
}

interface PickerContextProps {
	searchTerm?: string;
	setSearchTerm?: Dispatch<SetStateAction<string>>;
}

function usePickerContext(props?: PickerContextProps): [PickerContextType, Dispatch<SetStateAction<PickerContextType>>] {
	const DEFAULT_SETTINGS: PickerContextType = {
		searchTerm: '',
		showTrending: false
	};

	const [ pickerContext, innerSetPickerContext ] = useState<PickerContextType>(DEFAULT_SETTINGS);

	const setPickerContext: Dispatch<SetStateAction<PickerContextType>> = (context): void => {
		const newContext = typeof context === 'function' ? context(pickerContext) : context;

		innerSetPickerContext(newContext);

		if(props?.setSearchTerm && newContext.searchTerm !== props?.searchTerm) {
			props.setSearchTerm(newContext.searchTerm);
		}
	};

	useEffect(() => {
		if(props?.searchTerm !== undefined) {
			innerSetPickerContext({ ...pickerContext, searchTerm: props.searchTerm });
		}
	}, [ props?.searchTerm ]);

	return [ pickerContext, setPickerContext ];
}

export default usePickerContext;
