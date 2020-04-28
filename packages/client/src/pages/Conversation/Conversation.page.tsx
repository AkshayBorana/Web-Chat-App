import React, { useEffect, useState, useMemo } from "react";
import { api } from "../../lib/API";
import { Conversation, Message, Params } from "../../lib/types";
import { useParams } from "react-router";
import "./conversation.page.scss";
import { SendMessage } from "./SendMEssage.page";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import { CreateConversation } from "./CreateConversation";

export const ConversationPage = () => {
  const { conversationId } = useParams<Params>();
  const [conversation, updateConversation] = useState<Conversation>();
  const [messages, updateMessages] = useState<Message[]>([]);

  // This checks if user wants to create a new conversation or not...
  const isConversationNew: boolean = useMemo(
    () => conversationId === "create-conversation",
    [conversationId]
  );

  const loadInitialData = async () => {
    // If the URL param is 'create-conversaation', then stop...
    if (isConversationNew) return;

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
  }, [conversationId]); // update when URL params change, i.e conversationId changes...

  if (!conversation && !isConversationNew) return <span>Loading...</span>;

  return (
    <div className="grid-container">
      <Sidebar></Sidebar>
      <main className="conversation">
        {isConversationNew ? (
          // header if no conversation...
          <CreateConversation></CreateConversation>
        ) : (
          // header if conversation...
          <>
            <header className="conversation-name convo-title">
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
          </>
        )}
      </main>
    </div>
  );
};
