import React, { useContext, useEffect, useState } from 'react';
import ProviderContext from '../../context/TenorContext';
import GifList from './GifList';
import { Gif } from '../../types/GifProvider';

export interface TrendingResultProps {
	columnsCount: number;
}

function TrendingResult({ columnsCount }: TrendingResultProps) {
	const [trendingResult, setSearchResult] = useState<Gif[]>(null!);
	const [isLoading, setLoading] = useState(true);

	const provider = useContext(ProviderContext);

	useEffect(() => {
		setLoading(true);
		(async () => {
			const result = await provider.getTrending();
			setSearchResult(result);
			setLoading(false);
		})();
	}, []);

	return (
		<GifList
			columnsCount={columnsCount}
			isLoading={isLoading}
			result={trendingResult}
		/>
	);
}

export default TrendingResult;
