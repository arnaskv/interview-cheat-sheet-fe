import React, { useEffect, useState } from 'react';
import { Category } from '../../interfaces/Category';
import styles from './Categories.module.css';
import styleDetailedCard from '../shared/DetailedCart.module.css';
import useQuery from '../../hooks/useQuery';
import DeleteDialog from '../dialogs/DeleteDialog';
import { ENDPOINTS } from '../../constants/endpoints';
import { HTTP_METHODS } from '../../constants/http';
import { Delete as DeleteIcon } from '@mui/icons-material';
import ActionButton from '../buttons/ActionButton';
import CategoryFormDialog from '../dialogs/CategoryFormDialog';
import { ClickAwayListener, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Loader from '../shared/Loader';
import { useNavigate } from 'react-router-dom';

interface CategoryDetailsProps {
  categoryId: number;
  setCategoryId: (id: number | null) => void;
}

const CategoryDetails: React.FC<CategoryDetailsProps> = ({ categoryId, setCategoryId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: category,
    isLoading,
    errors,
    getData,
  } = useQuery<Category>({
    url: ENDPOINTS.CATEGORY.GET_ONE(categoryId.toString()),
    httpMethod: HTTP_METHODS.GET,
  });

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [categoryId]);

  const onUpdateSuccess = (response: Category) => {
    if (!category) {
      return;
    }

    category.title = response.title;
  };

  const updateCategoryCommand = useQuery({
    url: ENDPOINTS.CATEGORY.UPDATE,
    httpMethod: HTTP_METHODS.PATCH,
    onSuccess: onUpdateSuccess,
  });

  const handleUpdateSubmit = async (values: Category) => {
    values.id = Number(categoryId);
    await updateCategoryCommand.sendData(values);
  };

  const handleClickAway = () => {
    if (categoryId !== category?.id) {
      navigate(`/category/${categoryId}`);
      setCategoryId(categoryId);
    } else {
      navigate('/category');
      setCategoryId(null);
    }
  };

  if (errors) return <div className={styles.Error}>{errors.join(', ')}</div>;

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={styleDetailedCard.Box}>
        <div className={styleDetailedCard.Header}>
          <div className={styleDetailedCard.CloseButton}>
            <IconButton>
              <CloseIcon onClick={() => setCategoryId(null)} />
            </IconButton>
          </div>
          <div></div>
        </div>
        {category && (
          <>
            <div className={styleDetailedCard.TitleBox}>{isLoading ? <Loader /> : category?.title}</div>
            <div>
              <CategoryFormDialog onSubmit={handleUpdateSubmit} category={category} action="Edit Category" />
              <ActionButton
                onClick={() => setOpen(true)}
                startIcon={<DeleteIcon />}
                variant="contained"
                color="primary"
              >
                Delete
              </ActionButton>
              <DeleteDialog
                itemId={categoryId.toString()}
                deleteEndpoint={ENDPOINTS.CATEGORY.DELETE}
                dialogTitle="Delete this Category?"
                dialogDescription="If you delete this category, all follow up questions would be deleted. Are you sure?"
                deleteLabel="Delete Category"
                open={open}
                setOpen={setOpen}
              />
            </div>
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default CategoryDetails;
