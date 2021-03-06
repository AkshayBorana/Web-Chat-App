import axios from "axios";
import { setMe, getMe } from "../config";

class API {
  prefix: string = `http://localhost:4200`;

  // 1. Endpoint to display only one conversation/conversation details...
  async getConversation(convoId: string) {
    return this.request("get", `/conversations/${convoId}`);
  }

  // 2. Endpoint to display all the messages in a particular conversation...
  async getMessages(convoId: string) {
    return this.request("get", `/conversations/${convoId}/messages`);
  }

  // 3. Endpoint to create a message
  async createMessage(conversationId: string, content: string) {
    return this.request("post", "messages", {
      userId: getMe()!.id,
      conversationId,
      content
    });
  }

  // 4. Endpoint to display all conversations...
  async getConversations() {
    return this.request("get", "/conversations");
  }

  //5. Endpoint to create a conversation...
  async createConversation(name: string) {
    return this.request("post", "/conversations", { name });
  }

  // 6. Endpoint to login...
  async login(email: string, password: string) {
    return this.request("post", "/auth/login", { email, password });
  }

  // 2. Endpoint to user details...
  async me() {
    const me = await this.request("get", "/me");
    setMe(me);
    return me;
  }

  // Wrapper function...
  private async request(type: "get" | "post", url: string, data?: object) {
    const headers = {
      authorization: `Bearer ${localStorage.getItem("token")}`
    };

    try {
      let res: any;
      if (type === "get") {
        res = await axios.get(`${this.prefix}${url}`, { headers });
      }
      if (type === "post") {
        res = await axios.post(`${this.prefix}${url}`, data, { headers });
      }
      return res.data;
    } catch (e) {
      return null;
    }
  }
}

export const api = new API();
