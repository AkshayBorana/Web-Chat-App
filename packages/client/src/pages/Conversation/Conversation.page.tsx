import React, { useEffect, useState } from "react";
import { api } from "../../lib/API";
import { Conversation, Message, Params } from "../../lib/types";
import { useParams } from "react-router";
import "./conversation.page.scss";
import { SendMessage } from "./SendMEssage.page";

export const ConversationPage = () => {
  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);
  const { conversationId } = useParams<Params>();

  const loadInitialData = async () => {
    // displaying one single conversation with an ID...
    const convoRes = await api.getConversation(conversationId);
    if (!convoRes) return;
    updateConversation(convoRes);

    // Based on the above conversation, display all the related messages to it...
    const messgRes = await api.getMessages(conversationId);
    updateMessages(messgRes);
  };

  useEffect(() => {
    // just gets loaded for the first time...
    loadInitialData();
  }, []);

  return (
    <main className="conversation">
      {/* header */}
      <header className="conversation-name">
        {conversation ? (
          <>Conversation {conversation.name}</>
        ) : (
          <h1>Could not find the conversation</h1>
        )}
      </header>

      {/* Display's the list of messages */}
      <ul className="conversation-message">
        {messages.map(message => (
          <li className="conversation-message-list">
            <span>{message.content}</span>
          </li>
        ))}
      </ul>

      {/* footer */}
      <footer className="conversation-footer">
        <SendMessage
          conversationId={conversationId}
          onNewMessage={message => {
            updateMessages(messages => [...messages, message]);
          }}
        />
      </footer>
    </main>
  );
};
