import mongoose, { Schema, model, ObjectId } from 'mongoose';
import { Comment } from './comment';

export type Classe = {
  _doc?: object;
  comments?: Array<Comment>;
  userId: ObjectId;
  name: string;
  description?: string;
  video: string;
  data_init: Date;
  data_end: Date;
  date_created: Date;
  date_updated: Date;
  total_comments: number;
  last_comment?: string | null;
  last_comment_date?: string | null;
};

const schema = new Schema<Classe>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ID de usuário é obrigatório'],
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  name: { type: String, required: [true, 'Nome é obrigatório'] },
  description: { type: String, default: '' },
  video: { type: String, required: [true, 'URL é obrigatório'], unique: true },
  data_init: { type: Date, required: [true, 'Data que a aula est      ará disponivel é obrigatório'] },
  data_end: { type: Date, required: [true, 'Data que a aula não estará disponivel é obrigatório'] },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date, default: Date.now },
  total_comments: { type: Number, default: 0 },
});

const ClasseModel = model<Classe>('Classe', schema);

export default ClasseModel;
