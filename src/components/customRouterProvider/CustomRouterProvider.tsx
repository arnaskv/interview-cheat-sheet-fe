import { Suspense, FC, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants/routePaths';
import Loader from '../shared/Loader';

const Home = lazy(() => import('../../pages/home/Home'));
const CategoriesPage = lazy(() => import('../../pages/categories/CategoriesPage'));
const CategoryPage = lazy(() => import('../../pages/categories/CategoryPage'));
const CommentsList = lazy(() => import('../comments/CommentsList'));

const CustomRouterProvider: FC = () => {
  const router = createBrowserRouter([
    {
      path: ROUTE_PATHS.HOME,
      element: (
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATHS.CATEGORIES,
      element: (
        <Suspense fallback={<Loader />}>
          <CategoriesPage />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATHS.CATEGORY,
      element: (
        <Suspense fallback={<Loader />}>
          <CategoryPage />
        </Suspense>
      ),
    },
    {
      path: ROUTE_PATHS.COMMENTS,
      element: (
        <Suspense fallback={<Loader />}>
          <CommentsList />
        </Suspense>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default CustomRouterProvider;
