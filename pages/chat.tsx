import { Chat } from '@/components/Chat/Chat';
import { useRef } from 'react';

const ChatPage = () => {
  const stopConversationRef = useRef<boolean>(false);

  return (
    <div>
      <Chat stopConversationRef={stopConversationRef} />
    </div>
  );
};

export default ChatPage;
