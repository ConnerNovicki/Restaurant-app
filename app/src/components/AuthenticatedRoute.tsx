import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import useApiClient from '../lib/useApiClient';

interface Props {
  path: string;
  allowed: ('OWNER' | 'ADMIN' | 'USER')[];
  redirectTo: string;
}

const AuthenticatedRoute: React.FC<Props> = ({ children, path, allowed, redirectTo }) => {
  const [authStatus, setAuthStatus] = useState<'LOADING' | 'AUTHORIZED' | 'NOT_AUTHORIZED'>('LOADING');
  const apiClient = useApiClient();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setAuthStatus('NOT_AUTHORIZED')
      return;
    }

    apiClient.fetchUser()
      .then((user) => {
        if (allowed.includes(user.role)) {
          setAuthStatus('AUTHORIZED');
          return;
        }

        setAuthStatus('NOT_AUTHORIZED')
      })
      .catch(() => setAuthStatus('NOT_AUTHORIZED'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Route path={path} render={(props) => {
    switch (authStatus) {
      case 'LOADING':
        return <p>Loading...</p>
      case 'AUTHORIZED':
        return <>{children}</>
      case 'NOT_AUTHORIZED':
        return <Redirect to={{
          pathname: redirectTo,
          state: { from: props.location }
        }} />
    }
  }} />
}

export default AuthenticatedRoute
