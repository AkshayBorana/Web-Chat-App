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
}

export const api = new API();
