import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { routeConfig } from 'shared/config/route/routeConfig';
import { PageLoader } from 'shared/ui/page-loader/PageLoader';

const RouterProvider = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {Object.values(routeConfig).map((route) => (
          <Route
            element={route.element}
            key={route.path}
            path={route.path}
            children={route.children?.map((child) => (
              <Route
                element={child.element}
                key={child.path}
                path={child.path}
              />
            ))}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default RouterProvider;