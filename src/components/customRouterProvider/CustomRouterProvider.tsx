import { Suspense, FC, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTE_PATHS } from "../../constants/routePaths";

const Home = lazy(() => import('../../pages/home/Home'));


const CustomRouterProvider: FC = () => {

    const router = createBrowserRouter([
        {
            path: ROUTE_PATHS.HOME,
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            ),
        }
    ]);

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
};

export default CustomRouterProvider;