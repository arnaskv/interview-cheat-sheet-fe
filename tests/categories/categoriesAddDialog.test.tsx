import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CategoryAddDialog from '../../src/components/dialogs/CategoryAddDialog';
import userEvent from '@testing-library/user-event';
import useQuery from '../../src/hooks/useQuery';
import { ENDPOINTS } from '../../src/constants/endpoints';
import { HTTP_METHODS } from '../../src/constants/http';

jest.mock('../../src/hooks/useQuery');

describe('CategoryAddDialog', () => {

const useQueryMock = (useQuery as jest.Mock);
 
  it('calls addCategory with the correct category when submitted', async () => {
    const addCategoryMock = jest.fn();

    render(<CategoryAddDialog addCategory={addCategoryMock} />);

    const addButton = screen.getByRole('button', { name: /Add Category/i });
    fireEvent.click(addButton);

    const titleInput = screen.getByTestId('category-title');
    userEvent.type(titleInput, 'New Category');

    const submitButton = screen.getByRole('button', { name: /Add Category/i });
    fireEvent.click(submitButton);


    await waitFor(() => {
        expect(useQueryMock.mock.calls[0][0].onSuccess).toBeDefined();
        const onSuccess = useQueryMock.mock.calls[0][0].onSuccess;
        const mockResponse = { id: 1, title: 'New Category' }; 
        onSuccess(mockResponse); 
    });

      expect(useQueryMock.mock.calls[0][0].url).toBe(ENDPOINTS.CATEGORY.CREATE);
      expect(useQueryMock.mock.calls[0][0].httpMethod).toBe(HTTP_METHODS.POST);
      expect(addCategoryMock).toHaveBeenCalledWith({ id: 1, title: 'New Category' });

  });
});
