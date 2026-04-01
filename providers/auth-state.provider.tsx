'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { useTranslation } from '@/hooks/use-translation';
import { UserDetails } from '@/types/schemas/authorization-schemas';

type AuthContextType = {
  user: UserDetails | undefined;
  setUser: (user: UserDetails | undefined) => void;
  isAuthorized: boolean;
  isAuthorizing: boolean;
  setAuthorizing: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthStateProviderProperties = {
  children: ReactNode;
  userDetails: UserDetails | undefined;
  error?: string;
};

export function AuthStateProvider({ children, userDetails, error }: AuthStateProviderProperties) {
  const [user, setUser] = useState<UserDetails | undefined>(userDetails);
  const [isAuthorizing, setAuthorizing] = useState<boolean>(false);
  const isAuthorized = !!user;

  const { tor } = useTranslation();

  const authContext: AuthContextType = {
    user,
    setUser,
    isAuthorized,
    isAuthorizing,
    setAuthorizing,
  };

  useEffect(() => {
    if (error != undefined) {
      toast.error(tor(error, 'error.global.unknown'));
    }
  }, [error, tor]);

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth was not defined at time');
  }

  return context;
}
