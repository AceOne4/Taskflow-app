import { IMessage, IUser } from "@/types/types";
import { sendMessage, sendTypingStatus } from "@/utils/actions";
import { newId } from "@/utils/helper";
import { pusherClient } from "@/utils/pusher";
import { Session } from "next-auth";
import React, { useEffect, useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

interface ChatBoxProps {
  selectedContact: IUser | null;
  messages: IMessage[];
  session: Session | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedContact,
  messages,
  session,
}) => {
  const [input, setInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<IMessage[]>(messages);
  const [isTyping, setIsTyping] = useState<boolean>(false); // Typing indicator state
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false); // Emoji picker state
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for typing timeout

  useEffect(() => {
    if (!selectedContact || !session?.user?.id) return;

    setChatMessages(messages);
    const channelName = `chat-${newId(selectedContact._id, session.user.id)}`;
    pusherClient.subscribe(channelName);

    // Listen for incoming messages
    pusherClient.bind("upcoming-message", (data: IMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, data]);
    });

    // Listen for typing indicator
    pusherClient.bind(
      "typing-status",
      (data: { userId: string; typing: boolean }) => {
        if (data.userId !== session?.user?.id) {
          setIsTyping(data.typing);
        }
      }
    );

    return () => {
      pusherClient.unsubscribe(channelName);
      pusherClient.unbind("upcoming-message");
      pusherClient.unbind("typing-status");
    };
  }, [selectedContact, session?.user?.id, messages]);

  const handleSend = async () => {
    if (input.trim() && selectedContact) {
      const message = input;
      const sender = session?.user?.id as string;
      const reciver = selectedContact._id;

      await sendMessage({
        message,
        sender,
        reciver,
        channel: `chat-${newId(selectedContact._id, sender)}`,
      });

      setInput("");
      stopTyping(); // Stop typing indicator when message is sent
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);

    // Send typing indicator to the receiver
    sendTypingStatus(
      `chat-${newId(
        selectedContact?._id as string,
        session?.user?.id as string
      )}`,
      session?.user?.id as string,
      true
    );

    // Clear previous timeout and set a new one
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Stop typing indicator after 5 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      stopTyping();
    }, 5000);
  };

  const stopTyping = () => {
    sendTypingStatus(
      `chat-${newId(
        selectedContact?._id as string,
        session?.user?.id as string
      )}`,
      session?.user?.id as string,
      false
    );
  };

  const handleEmojiClick = (emoji: any) => {
    setInput((prevInput) => prevInput + emoji.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selection
  };

  return (
    <div className="flex-1 rounded bg-neutral-800 flex flex-col text-indigo-950 h-1/2 overflow-y-auto">
      <div className="px-3 py-3 bg-indigo-600 text-white">
        <p>{selectedContact?.name}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 ${
              msg.sender === session?.user?.id ? "text-right" : ""
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === session?.user?.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {/* Show typing indicator if the other user is typing */}
        {isTyping && (
          <p className="text-sm text-gray-500">
            {selectedContact?.name} is typing...
          </p>
        )}
      </div>
      <div className="flex items-center p-4 border-t border-gray-300">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="mr-2"
        >
          😊
        </button>
        {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg p-2"
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
