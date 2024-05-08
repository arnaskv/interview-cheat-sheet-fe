import { Suspense, FC, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTE_PATHS } from '../../constants/routePaths';
import Loader from '../shared/Loader';
import Layout from '../layout/Layout';

const Home = lazy(() => import('../../pages/home/Home'));
const CategoriesPage = lazy(() => import('../../pages/categories/CategoriesPage'));

const CustomRouterProvider: FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: ROUTE_PATHS.HOME,
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          ),
          children: [
            {
              path: ':id',
              element: (
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: ROUTE_PATHS.CATEGORIES,
          element: (
            <Suspense fallback={<Loader />}>
              <CategoriesPage />
            </Suspense>
          ),
          children: [
            {
              path: ':id',
              element: (
                <Suspense fallback={<Loader />}>
                  <CategoriesPage />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default CustomRouterProvider;
