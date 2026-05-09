import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasAdminToken } from './adminApi';

const AdminRootRedirect: React.FC = () => {
  return hasAdminToken() ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/admin/login" replace />;
};

export default AdminRootRedirect;
