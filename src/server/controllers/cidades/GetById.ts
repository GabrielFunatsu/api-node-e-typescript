import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (
  req: Request<IParamProps>,
  res: Response
): Promise<any> => {
  if (!req.params.id) {
    return res.status(400).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado',
      },
    });
  }

  const result = await CidadesProvider.getById(req.params.id);
  if (result instanceof Error) {
    return res.status(500).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(200).json(result);
};
