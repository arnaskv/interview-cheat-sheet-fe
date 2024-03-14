import { lazy } from "react";
import { ROUTE_PATHS } from "./routePaths";

const Home = lazy(() => import('../pages/home/Home'));

export const ROUTES = [
    {
        path: ROUTE_PATHS.HOME,
        component: Home,
    }
];