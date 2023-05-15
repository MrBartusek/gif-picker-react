import React, { useContext, useEffect, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import { TenorResult } from '../../managers/TenorManager';
import GifList from './GifList';

export interface TrendingResultProps {
	columnsCount: number;
}

function TrendingResult({ columnsCount }: TrendingResultProps) {
	const [ trendingResult, setSearchResult ] = useState<TenorResult>(null!);
	const [ isLoading, setLoading ] = useState(true);

	const tenor = useContext(TenorContext);

	useEffect(() => {
		setLoading(true);
		(async () => {
			const result = await tenor.trending();
			setSearchResult(result);
			setLoading(false);
		})();

	}, [ ]);

	return (
		<GifList columnsCount={columnsCount} isLoading={isLoading} result={trendingResult} />
	);
}

export default TrendingResult;
