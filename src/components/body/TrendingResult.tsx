import React, { useContext, useEffect, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import { TenorResult } from '../../managers/TenorManager';
import GifList from './GifList';

function TrendingResult() {
	const tenor = useContext(TenorContext);
	const [ trendingResult, setSearchResult ] = useState<TenorResult | undefined>(undefined);

	useEffect(() => {
		(async () => {
			const result = await tenor.trending();
			setSearchResult(result);
		})();

	}, [ ]);

	return (
		<GifList result={trendingResult} />
	);
}

export default TrendingResult;
