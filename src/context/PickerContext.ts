import React, { Dispatch, SetStateAction } from 'react';
import { PickerContextType } from '../hooks/usePickerContext';

const PickerContext = React.createContext<[PickerContextType, Dispatch<SetStateAction<PickerContextType>>]>(null!);

export default PickerContext;
