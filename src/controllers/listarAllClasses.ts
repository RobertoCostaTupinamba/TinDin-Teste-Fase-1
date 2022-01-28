import { MongooseQueryParser } from 'mongoose-query-parser';
import { Response, Request } from 'express';
import ClasseModel from '../models/classe';

export async function listarAllClasses(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { limit = 50, filter = {}, sort = { date_created: -1 } } = new MongooseQueryParser().parse(req.query);

  const classes = await ClasseModel.find({ ...filter, userId: idUser })
    .populate({
      path: 'comments',
      options: {
        sort: { date_created: -1 },
        limit: 1,
      },
    })
    .sort(sort)
    .skip(filter.page && filter.page > 0 ? (filter.page - 1) * limit : 0)
    .limit(limit);

  if (classes.length === 0) {
    return res.json({ message: 'Nenhum dado foi encontrado' });
  }

  // construindo resposta
  const classesRetorno = classes.map((classe) => {
    const currentClassObject = classe.toObject();
    const lastCommentItem = currentClassObject.comments ? currentClassObject.comments[0] : null;
    delete currentClassObject.comments;

    return {
      ...currentClassObject,
      last_comment: (lastCommentItem && lastCommentItem.comment) || null,
      last_date_comment: (lastCommentItem && lastCommentItem.date_created) || null,
    };
  });

  return res.json(classesRetorno);
}
