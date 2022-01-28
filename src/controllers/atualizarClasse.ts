import { Response, Request } from 'express';
import Classe from '../models/classe';

export async function atualizarClasse(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { id } = req.params;

  try {
    const classe = await Classe.findOneAndUpdate(
      {
        userId: idUser,
        _id: id,
      },
      req.body,
    );

    if (!classe) {
      return res.status(404).json({ message: 'Identificador da aula não encontrado' });
    }

    return res.json(classe);
  } catch (error: any) {
    if (error.message.includes(id)) {
      return res.status(404).json({ message: 'Identificador da aula não encontrado' });
    }
    return res.status(500).json({ message: 'Houve um erro não esperado' });
  }
}
