// models/Message.ts
import mongoose, { Schema, Document, models, Model } from 'mongoose';

export interface IReply extends Document {
  user: string;
  text: string;
}

export interface IMessage extends Document {
  user: string;
  text: string;
  replies: IReply[];
}

const ReplySchema: Schema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true }); // Pastikan timestamps ada di sini juga

const MessageSchema: Schema = new Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  replies: [ReplySchema],
}, { timestamps: true });

const Message: Model<IMessage> = models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
