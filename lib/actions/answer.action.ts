"use server";

import { CreateAnswerParams, GetAnswersParams } from "./shared.types.d";
import { connectToDatabase } from "../mogoose";
import Answer from "@/database/answer.model";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import User from "@/database/user.model"; 

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { content, question, author, path } = params;

    const newAnswer = await Answer.create({ content, author, question });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // const answer = await Answer.create({
    //   content,
    //   question,
    //   author,
    // });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId } = params;

    const answers = await Answer.find({question: questionId})
      .populate("author", "_id clerkId name picture")
      .sort({ createdAt: -1 });
    
      return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
