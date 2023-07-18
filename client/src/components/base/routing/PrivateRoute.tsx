// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  outlet,
}: PrivateRouteProps) => {
  if (isAuthenticated) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};

export default PrivateRoute;
