import React, { useEffect, useState } from "react";
import { api } from "../../lib/API";
import { Conversation, Message } from "../../lib/types";

export const HomePage = () => {
  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  const loadInitialData = async () => {
    // displaying one single conversation with an ID...
    const convoRes = await api.getConversation(
      "d0ec013d-1f60-42df-94c3-5f6f18c5d99f"
    );
    updateConversation(convoRes);

    // Based on the above conversation, display all the related messages to it...
    const messgRes = await api.getMessages(
      "d0ec013d-1f60-42df-94c3-5f6f18c5d99f"
    );
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
