import { Response, Request } from 'express';
import Classe from '../models/classe';
import Comment from '../models/comment';

export async function deletarComment(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { id } = req.params;

  await Comment.findOne({ _id: id, userId: idUser })
    .then(async (result) => {
      if (!result) {
        return res.status(404).json({ message: 'Comentario não encontrada' });
      }

      await Comment.deleteOne({ _id: id, userId: idUser });

      const classe = await Classe.findOne({ _id: result?.id_class, userId: idUser });

      if (!classe) {
        return res.status(404).json({ message: 'Turma não encontrada' });
      }

      classe.total_comments -= 1;

      const numberId: any = id;

      const index = classe.comments?.indexOf(numberId);

      if (index) {
        classe.comments?.splice(index, 1);
      }

      classe.save();
      return res.json({ message: 'O comentário foi removido' });
    })
    .catch(() => {
      return res.status(404).json({ message: 'Identificador do comentário não encontrado' });
    });
}
