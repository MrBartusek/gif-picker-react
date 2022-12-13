import { Dispatch, SetStateAction } from 'react';
export interface PickerContextType {
    searchTerm: string;
}
declare function usePickerContext(): [PickerContextType, Dispatch<SetStateAction<PickerContextType>>];
export default usePickerContext;
