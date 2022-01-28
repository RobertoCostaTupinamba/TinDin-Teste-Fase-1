import { Response, Request } from 'express';
import Classe from '../models/classe';

export async function listarUmaClasse(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { id } = req.params;

  const classe = await Classe.findOne(
    {
      userId: idUser,
      _id: id,
    },
    {
      _id: 0,
      userId: 0,
      description: 0,
      video: 0,
      data_init: 0,
      data_end: 0,
      total_comments: 0,
      date_created: 0,
      date_updated: 0,
      __v: 0,
    },
  ).populate({
    path: 'comments',
    select: '-_id',
    options: {
      sort: { date_created: -1 },
      limit: 3,
      select: 'comment',
    },
  });

  if (!classe) {
    return res.status(404).json({ message: 'Aula não encontrada' });
  }

  const aula = { ...classe?._doc };

  return res.json(aula);
}
