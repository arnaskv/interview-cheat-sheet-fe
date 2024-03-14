import { Suspense, FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface RouteDefinition {
    path: string;
    component: FC;
  }

const RouterProvider: FC = () => {
    const getComponent = (route : RouteDefinition) => {
        const Component = route.component;
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component />
            </Suspense>
        );
    };

    return (
        <Router>
            <Routes>
                {ROUTES.map((route: RouteDefinition) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={getComponent(route)}
                    />
                ))}
            </Routes>
        </Router>
    );
};

export default RouterProvider;