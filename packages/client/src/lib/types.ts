export interface Conversation {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  content: string;
}

export interface Params {
  conversationId: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
