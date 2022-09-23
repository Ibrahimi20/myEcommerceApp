import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function AdminRoute({ children }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userinfo } = state;
  return userinfo && userinfo.isAdmin ? (
    children
  ) : (
    <Navigate to="/signin"></Navigate>
  );
}
