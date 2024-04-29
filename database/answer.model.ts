import { Schema, models, model, Document } from "mongoose";

export interface IAnswer extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  dowvotes: Schema.Types.ObjectId[];
  createdAt: Date;
}

const AnswerSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  question: [{ type: Schema.Types.ObjectId, ref: "Question", required: true }],
  content: { type: String, required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dowvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Answer = models.Answer || model("Answer", AnswerSchema);

export default Answer;
