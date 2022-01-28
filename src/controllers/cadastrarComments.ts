import { Response, Request } from 'express';
import Comment from '../models/comment';
import Classe from '../models/classe';

export async function cadastrarComment(req: Request, res: Response) {
  const idUser = res.locals.id;
  const { comment, id_class } = req.body;

  if (!comment) {
    return res.status(400).json({ message: 'Comentário não poder ser vazio' });
  }
  if (!id_class) {
    return res.status(400).json({ message: 'Identificador da aula é obrigatorio' });
  }

  const classe = await Classe.findById({ userId: idUser, _id: id_class });

  if (!classe) {
    return res.status(404).json({ message: 'Turma não encontrada' });
  }

  const totalCommensOfClass = classe.total_comments || 0;
  const count = totalCommensOfClass + 1;

  const comentario = await new Comment({ id_class, comment }).save();

  let arrayComentarios = null;
  if (classe.comments) {
    arrayComentarios = [...classe.comments, comentario._id];
  } else {
    arrayComentarios = [comentario._id];
  }

  await Classe.findByIdAndUpdate(id_class, {
    comments: arrayComentarios,
    total_comments: count,
    date_updated: Date.now(),
  });

  return res.json(comentario);
}
