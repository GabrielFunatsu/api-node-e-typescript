import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().moreThan(0),
      limit: yup.number().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
): Promise<any> => {
  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', 1);

  return res.status(200).json([
    {
      id: 1,
      nome: 'Dourados',
    },
  ]);
};
