import { Response, Request } from 'express';
import Classe from '../models/classe';

export async function cadastrarClasse(req: Request, res: Response) {
  const idUser = res.locals.id;

  const { name, description, video, data_init, data_end } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nome do video é obrigatorio' });
  }
  if (!video) {
    return res.status(400).json({ message: 'URL do video é obrigatorio' });
  }
  if (!data_init) {
    return res.status(400).json({ message: 'Data que a aula estará disponivel é obrigatório' });
  }
  if (!data_end) {
    return res.status(400).json({ message: 'Data que a aula não estará disponivel é obrigatório' });
  }

  // check if url exists
  const aula = await Classe.findOne({ video });

  if (aula) {
    return res.status(400).json({ message: 'A url da aula já existe' });
  }

  const classe = await new Classe({ userId: idUser, name, description, video, data_init, data_end }).save();

  return res.json({ classe });
}
