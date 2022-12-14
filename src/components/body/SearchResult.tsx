import React, { useContext, useEffect, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import { TenorResult } from '../../managers/TenorManager';
import GifList from './GifList';

export interface SearchResultProps {
	searchTerm: string;
}

function SearchResult({ searchTerm }: SearchResultProps) {
	const tenor = useContext(TenorContext);
	const [ searchResult, setSearchResult ] = useState<TenorResult | undefined>(undefined);

	useEffect(() => {
		setSearchResult(undefined);
		async function search(): Promise<any> {
			const result = await tenor.search(searchTerm);
			setSearchResult(result);
		}
		const debounce = setTimeout(() => search(), 800);
		return (): void => clearTimeout(debounce);
	}, [ searchTerm ]);

	return (
		<GifList result={searchResult} searchTerm={searchTerm} />
	);
}

export default SearchResult;
