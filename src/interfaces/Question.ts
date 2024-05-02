import { Category } from './Category';

interface Question {
  id?: number;
  title: string;
  category: Category
}

export default Question;
