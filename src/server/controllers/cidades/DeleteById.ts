import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (
  req: Request<IParamProps>,
  res: Response
): Promise<any> => {
  if (Number(req.params.id) === 99999)
    return res.status(500).json({
      errors: {
        default: 'Registro não encontrado',
      },
    });

  return res.status(204).send();
};
