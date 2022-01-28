import { MongooseQueryParser } from 'mongoose-query-parser';
import { Response, Request } from 'express';
import ClasseModel from '../models/classe';

export async function listarAllComments(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { id_class } = req.body;

  const { limit = 50, filter = {}, sort = { date_created: -1 } } = new MongooseQueryParser().parse(req.query);

  const classes = await ClasseModel.findOne(
    { _id: id_class, userId: idUser },
    {
      _id: 0,
      userId: 0,
      data_init: 0,
      data_end: 0,
      date_created: 0,
      date_updated: 0,
      __v: 0,
    },
  )
    .populate({
      path: 'comments',
      options: {
        sort: { date_created: -1 },
        limit,
        skip: filter.page && filter.page > 0 ? (filter.page - 1) * limit : 0,
        select: 'comment',
      },
    })
    .sort(sort);

  if (!classes) {
    return res.json({ message: 'Nenhum dado foi encontrado' });
  }

  return res.json(classes);
}
