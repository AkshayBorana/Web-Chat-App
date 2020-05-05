import { UserConversation } from "../models/UserConversation";

export const checkUserConvo = async (
  userId: string,
  conversationId: string
) => {
  const result = await UserConversation.findOne({
    where: {
      userId,
      conversationId
    }
  });

  if (!result) throw new Error(`You do not have access to that conversation.`);
  return true;
};
