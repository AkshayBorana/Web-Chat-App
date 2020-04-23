import React, { useEffect, useState } from "react";
import { api } from "../../lib/API";
import { Conversation, Message, Params } from "../../lib/types";
import { useParams } from "react-router";

export const ConversationPage = () => {
  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);
  const { conversationId } = useParams<Params>();

  const loadInitialData = async () => {
    // displaying one single conversation with an ID...
    const convoRes = await api.getConversation(conversationId);
    updateConversation(convoRes);

    // Based on the above conversation, display all the related messages to it...
    const messgRes = await api.getMessages(conversationId);
    console.log(messgRes);
    updateMessages(messgRes);
  };

  useEffect(() => {
    // just gets loaded for the first time...
    loadInitialData();
  }, []);

  return (
    <div>
      {conversation && <h1>Conversation: {conversation.name}</h1>}
      <ul className="messages">
        {messages.map(message => (
          <li>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};
