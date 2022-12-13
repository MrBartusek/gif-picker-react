/// <reference types="react" />
import { TenorCategory } from '../../managers/TenorManager';
import './CategoryList.css';
export interface CategoryListProps {
    categories?: TenorCategory[];
}
declare function CategoryList({ categories }: CategoryListProps): JSX.Element;
export default CategoryList;
