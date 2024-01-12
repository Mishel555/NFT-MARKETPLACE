import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '@hooks';
import { RootRoutes } from '@constants/routes';
import { RouteRenderer, TemplateRenderer } from '@components/main';

const RootRouter = () => {
  // all info about authorization
  const { isLoaded } = useAuth();

  return isLoaded ? (
    <Routes>
      {RootRoutes.map(({
        path,
        element,
        mode,
        roles,
        template,
      }, index) => (
        <Route
          key={index}
          path={path}
          element={(
            <TemplateRenderer template={template}>
              <RouteRenderer element={element} mode={mode} roles={roles} />
            </TemplateRenderer>
          )}
        />
      ))}
    </Routes>
  ) : (
    <Fragment>

    </Fragment>
  );
};


export default RootRouter;
