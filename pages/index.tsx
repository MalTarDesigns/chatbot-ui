import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { Chat } from '@/components/Chat/Chat';

const IndexPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const stopConversationRef = useRef(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? (
    <Chat stopConversationRef={stopConversationRef} />
  ) : null;
};

export default IndexPage;
