import React, { useContext, useEffect, useState } from 'react';
import ProviderContext from '../../context/TenorContext';
import GifList from './GifList';
import { Gif } from '../../types/GifProvider';

export interface SearchResultProps {
	searchTerm: string;
	columnsCount: number;
}

function SearchResult({ searchTerm, columnsCount }: SearchResultProps) {
	const [searchResult, setSearchResult] = useState<Gif[]>(null!);
	const [isLoading, setLoading] = useState(true);
	const tenor = useContext(ProviderContext);

	useEffect(() => {
		setLoading(true);
		async function search(): Promise<any> {
			const result = await tenor.search(searchTerm);
			setSearchResult(result);
			setLoading(false);
		}
		const debounce = setTimeout(() => search(), 800);
		return (): void => clearTimeout(debounce);
	}, [searchTerm]);

	return (
		<GifList
			isLoading={isLoading}
			columnsCount={columnsCount}
			result={searchResult}
			searchTerm={searchTerm}
		/>
	);
}

export default SearchResult;
