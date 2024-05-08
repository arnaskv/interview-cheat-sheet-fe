import { Category } from './Category';

interface Question {
  id?: number;
  title: string;
  category: Category;
  subQuestions?: Question[];
}

export default Question;
