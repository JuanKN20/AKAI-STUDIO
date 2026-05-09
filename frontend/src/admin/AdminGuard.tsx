import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasAdminToken } from './adminApi';

type AdminGuardProps = {
  showInternalRoutes: boolean;
  children: React.ReactElement;
};

const AdminGuard: React.FC<AdminGuardProps> = ({ showInternalRoutes, children }) => {
  const location = useLocation();

  if (!showInternalRoutes) {
    return <Navigate to="/" replace />;
  }

  if (!hasAdminToken()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default AdminGuard;
