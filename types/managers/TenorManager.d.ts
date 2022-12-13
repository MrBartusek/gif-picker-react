import { ContentFilter, TenorImage } from '../types/exposedTypes';
export interface TenorCategory {
    image: string;
    name: string;
}
export interface TenorSearchResult {
    next: string;
    images: TenorImage[];
}
declare class TenorManager {
    private apiKey;
    private clientKey;
    private country;
    private locale;
    private contentFilter;
    constructor(apiKey: string, clientKey: string, country: string, locale: string, contentFilter: ContentFilter);
    private callApi;
    categories(): Promise<TenorCategory[]>;
    search(term: string): Promise<TenorSearchResult>;
}
export default TenorManager;
