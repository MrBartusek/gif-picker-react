/// <reference types="react" />
import './Category.css';
export interface CategoryProps {
    image: string;
    name: string;
}
declare function Category({ image, name }: CategoryProps): JSX.Element;
export default Category;
