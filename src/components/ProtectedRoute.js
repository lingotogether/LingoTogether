import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
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
                <>
                    {/* <h1>456</h1> */}
                    <Home {...props} />
                </>
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
