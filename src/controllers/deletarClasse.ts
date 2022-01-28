import { Response, Request } from 'express';
import Classe from '../models/classe';

export async function deletarClasse(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { id } = req.params;

  const deleted = await Classe.deleteOne({
    userId: idUser,
    _id: id,
  });

  if (deleted.deletedCount > 0) {
    return res.json({ message: 'A aula foi removida' });
  }

  return res.json({ message: 'A aula não encontrada' });
}
