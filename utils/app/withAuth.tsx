import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';

const withAuth = (WrappedComponent: any) => {
  const RequiresAuthentication = (props: any) => {
    const Router = useRouter();
    const { user }: any = useContext(AuthContext);

    useEffect(() => {
      if (!user) {
        Router.replace('/login');
      }
    }, [user, Router]);

    return <WrappedComponent {...props} />;
  };

  // This line sets the display name.
  RequiresAuthentication.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return RequiresAuthentication;
};

function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAuth;
