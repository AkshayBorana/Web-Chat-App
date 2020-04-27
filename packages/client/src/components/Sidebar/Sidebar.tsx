import React, { useEffect, useState } from "react";
import { api } from "../../lib/API";
import { Conversation } from "../../lib/types";
import { Link } from "react-router-dom";

import "./sidebar.scss";

export const Sidebar = () => {
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const getConversations = async () => {
    const conversations = await api.getConversations();
    setConversation(conversations);
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <aside className="side-bar">
      <ul>
        {conversation.map(convo => (
          <li className="convo-list">
            <Link className="convo-list-name" to={`/conversation/${convo.id}`}>
              {convo.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
