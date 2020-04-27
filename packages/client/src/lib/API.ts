import axios from "axios";

class API {
  prefix: string = `http://localhost:4200`;

  // 1. Endpoint to display only one conversation/conversation details...
  async getConversation(convoId: string) {
    try {
      const res = await axios.get(`${this.prefix}/conversations/${convoId}`);
      return res.data;
    } catch (e) {
      return null;
    }
  }

  // 2. Endpoint to display all the messages in a particular conversation...
  async getMessages(convoId: string) {
    const res = await axios.get(
      `${this.prefix}/conversations/${convoId}/messages`
    );
    return res.data;
  }

  // 3. Endpoint to create a message
  async createMessage(conversationId: string, content: string) {
    const res = await axios.post(`${this.prefix}/messages`, {
      content,
      conversationId,
      userId: "e9c71165-8aed-4a42-9deb-4af18d96ac52"
    });
    return res.data;
  }

  // 4. Endpoint to display all conversations...
  async getConversations() {
    try {
      const res = await axios.get(`${this.prefix}/conversations`);
      return res.data;
    } catch (e) {
      return null;
    }
  }
}

export const api = new API();
