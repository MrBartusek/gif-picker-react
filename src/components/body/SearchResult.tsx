import React, { useContext, useEffect, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import PickerContext from '../../context/PickerContext';
import { TenorResult } from '../../managers/TenorManager';
import GifList from './GifList';

export interface SearchResultProps {
	searchTerm: string;
	columnsCount: number;
}

function SearchResult({ searchTerm, columnsCount }: SearchResultProps) {
	const [searchResult, setSearchResult] = useState<TenorResult>(null!);
	const [isLoading, setLoading] = useState(true);
	const [pickerContext] = useContext(PickerContext);
	const tenor = useContext(TenorContext);

	useEffect(() => {
		setLoading(true);
		async function search(): Promise<any> {
			const result = await tenor.search(searchTerm || pickerContext.initialSearchTerm);
			setSearchResult(result);
			setLoading(false);
		}
		const debounce = setTimeout(() => search(), 800);
		return (): void => clearTimeout(debounce);
	}, [searchTerm, pickerContext.initialSearchTerm]);

	return (
		<GifList isLoading={isLoading} columnsCount={columnsCount} result={searchResult} searchTerm={searchTerm} />
	);
}

export default SearchResult;
