import React, { useContext, useEffect, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import { TenorResult } from '../../managers/TenorManager';
import GifList from './GifList';

export interface SearchResultProps {
	searchTerm: string;
}

function SearchResult({ searchTerm }: SearchResultProps) {
	const [ searchResult, setSearchResult ] = useState<TenorResult>(null!);
	const [ isLoading, setLoading ] = useState(true);
	const tenor = useContext(TenorContext);

	useEffect(() => {
		setLoading(true);
		async function search(): Promise<any> {
			const result = await tenor.search(searchTerm);
			setSearchResult(result);
			setLoading(false);
		}
		const debounce = setTimeout(() => search(), 800);
		return (): void => clearTimeout(debounce);
	}, [ searchTerm ]);

	return (
		<GifList isLoading={isLoading} result={searchResult} searchTerm={searchTerm} />
	);
}

export default SearchResult;
