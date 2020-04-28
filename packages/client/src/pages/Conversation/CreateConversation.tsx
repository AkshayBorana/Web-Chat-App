import React, { FormEvent, useRef, useState } from "react";
import { api } from "../../lib/API";
import { Conversation } from "../../lib/types";
import { Redirect } from "react-router";

export const CreateConversation = () => {
  const [convo, setConvo] = useState<Conversation>();
  const input = useRef<HTMLInputElement>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const convoName = input.current!.value;
    const conversation = await api.createConversation(convoName);
    setConvo(conversation);
  };

  // Redirecting to the newly created conversation...
  if (convo) return <Redirect to={`/conversation/${convo.id}`}></Redirect>;

  // When creating a new conversation...
  return (
    <header className="convo-title create-convo">
      <form onSubmit={submit}>
        <input
          className="create-convo-input"
          type="text"
          placeholder="New Conversation"
          ref={input}
        ></input>
        <button className="create-convo-btn">Create</button>
      </form>
    </header>
  );
};
