/// <reference types="react" />
import './SearchResult.css';
export interface CategoryListProps {
    term: string;
}
declare function SearchResult({ term }: CategoryListProps): JSX.Element;
export default SearchResult;
