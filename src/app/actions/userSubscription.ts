import { db } from "../../../configs";
import { subscription } from "../../../configs/schema";

export const createSubscription = async (userID: string) => {
  const newSubscription = await db.insert(subscription).values({
    userId: userID,
    isSubscribed: true,
    createAt: new Date(),
    updatedAt: new Date(),
  });
  return newSubscription;
};

export const getUserSubscription = async (userID: string) => {
  if (!userID) {
    throw new Error("Not authenticated.");
  }

  const getSubscribed = await db.query.subscription.findFirst({
    with: {
      userID: userID,
    },
  });
  return getSubscribed?.isSubscribed;
};
