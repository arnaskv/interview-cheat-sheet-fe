import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import useQuery from '../../src/hooks/useQuery';
import Categories from '../../src/components/categories/Categories';
import { useNavigate } from 'react-router-dom';

jest.mock('../../src/hooks/useQuery');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), 
}));

describe('Categories List', () => {

  const useQueryMock = (useQuery as jest.Mock);
  const useNavigateMock = (useNavigate as jest.Mock);

  beforeEach(() => {
    useQueryMock.mockReturnValue({ data: [], isLoading: false, errors: null });
    useNavigateMock.mockReset();
  });

  it('Should render page', () => {
    render(
      <Router>
        <Categories />
      </Router>
    );

    expect(screen.getByText('Category bank')).toBeInTheDocument();
  });

  it('Should render loader when data is loading', () => {
    useQueryMock.mockReturnValue({ data: [], isLoading: true, errors: null });

    render(<Categories />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('Should render error message when there are errors', () => {
    useQueryMock.mockReturnValue({ data: [], isLoading: false, errors: ['Error message'] });

    render(<Categories />);

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('Should render no categories found', () => {

    render(<Categories />);

    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });
  
  it('Should render category items when categoryList is not empty', () => {
    const categoryList = [
      { id: 1, title: 'Category 1' },
      { id: 2, title: 'Category 2' },
    ];

    useQueryMock.mockReturnValue({ data: categoryList, isLoading: false, errors: null });

    render(<Categories />);

    categoryList.forEach(category => {
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
  });

  it('Should navigate to the correct category when a category item is clicked', () => {

    const categoryList = [
      { id: 1, title: 'Category 1' },
      { id: 2, title: 'Category 2' },
    ];

    useQueryMock.mockReturnValue({ data: categoryList, isLoading: false, errors: null });

    const navigateMock = jest.fn();
    const categoryIdToNavigate = 1;

    useNavigateMock.mockReturnValue(navigateMock);

    render(
      <Router>
        <Categories />
      </Router>
    );

    const categoryItem = screen.getByText('Category 1');

    fireEvent.click(categoryItem);
    expect(navigateMock).toHaveBeenCalledWith(`/category/${categoryIdToNavigate}`);
  });

  it('Should open the dialog when "Add Category" button is clicked', () => {

    render(<Categories />);

    const addButton = screen.getByText('Add Category');
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);

    // buttons should appear in the dialog
    const submitButton = screen.getByRole('button', { name: /Add Category/i });
    const cancelButton = screen.getByRole('button', { name: /Cancel/i });
    expect(submitButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

});
