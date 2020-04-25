import React, { FormEvent, useRef } from "react";
import { api } from "../../lib/API";
import { Message } from "../../lib/types";

export interface SendMessageProps {
  conversationId: string;
  onNewMessage: (message: Message) => void;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  conversationId,
  onNewMessage
}) => {
  const input = useRef<HTMLInputElement>(null);

  const sumbit = async (e: FormEvent) => {
    const content = input.current!.value;

    //prevents from refreshing the page...
    e.preventDefault();

    //calling Create message api...
    const newMessage = await api.createMessage(conversationId, content);
    onNewMessage(newMessage);

    // clear the form after submitting...
    input.current!.value = "";
  };

  return (
    <form onSubmit={sumbit}>
      <input
        className="conversation-footer-input"
        type="text"
        ref={input}
      ></input>
    </form>
  );
};
