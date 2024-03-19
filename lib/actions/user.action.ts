"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mogoose";

export async function getUserById(params: any) {
  try {
    connectToDatabase();

    const { userId } = params;

    console.log('id do usuario', userId)

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
