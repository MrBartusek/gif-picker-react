import React from 'react';
import { PickerContextType } from '../hooks/usePickerContext';
declare const PickerContext: React.Context<[PickerContextType, React.Dispatch<React.SetStateAction<PickerContextType>>]>;
export default PickerContext;
