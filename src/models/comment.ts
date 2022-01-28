import mongoose, { Schema, model, ObjectId } from 'mongoose';

export type Comment = {
  _id: ObjectId;
  id_class: ObjectId;
  comment: string;
  date_created: Date;
};

const schema = new Schema<Comment>({
  id_class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classe',
    required: [true, 'ID da aula é obrigatório'],
  },
  comment: {
    type: String,
    trim: true,
    required: true,
  },
  date_created: { type: Date, default: Date.now },
});

const CommentModel = model<Comment>('Comment', schema);

export default CommentModel;
