import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { CidadesProvider } from '../../database/providers/cidades';

interface IQueryProps {
  id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      id: yup.number().integer().optional().default(0),
      page: yup.number().optional().moreThan(0),
      limit: yup.number().optional().moreThan(0),
      filter: yup.string().optional(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
): Promise<any> => {
  const result = await CidadesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 7,
    req.query.filter || '',
    Number(req.query.id)
  );
  const count = await CidadesProvider.count(req.query.filter || '');

  if (result instanceof Error) {
    return res.status(500).json({
      errors: { default: result.message },
    });
  } else if (count instanceof Error) {
    return res.status(500).json({
      errors: { default: count.message },
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', count);

  return res.status(200).json(result);
};
