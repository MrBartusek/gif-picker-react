import { useContext } from 'react';
import ProviderContext from '../context/ProviderContext';
import { GifProviderAttribution } from '../types/GifProvider';

const DEFAULT_ATTRIBUTION: GifProviderAttribution = {
	searchPlaceholder: 'Search GIFs',
};

function useAttribution(): GifProviderAttribution {
	const provider = useContext(ProviderContext);
	const attribution = provider.getAttribution?.();

	return { ...DEFAULT_ATTRIBUTION, ...attribution };
}

export default useAttribution;
