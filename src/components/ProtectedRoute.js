import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({
    component: Component, //home
    isAuthenticated,
    isVerifying,
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ? (
                <Fragment>
                {
                    <Component {...props} />
                }
                </Fragment>
            ) : (
                <Redirect
                    to={{
                        pathname: '/TopHome',
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
);
export default ProtectedRoute;
