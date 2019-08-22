import { NextFunction, Request, Response } from 'express';

export function handlerFactory<T>(callback: IHandler<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const data = await callback(
      {
        queryParams: req.query,
        urlParams: req.params as IUrlParams,
      },
      req.body
    );

    if (data instanceof Error) {
      next(data);
    }

    res.json(data);
  };
}

export type IHandler<T> = (
  params: IParams,
  body: any
) => T | Promise<T> | Error;

export interface IParams {
  queryParams: IQueryParams;
  urlParams: IUrlParams;
}

interface IQueryParams {
  [key: string]: string | undefined;
}

interface IUrlParams {
  [key: string]: string | undefined;
}
/////////////

// const app = Express();

// interface IPerson {
//   name: string;
//   age: number;
// }

// interface IFindPersonParams extends IParams {
//   urlParams: {
//     id: string;
//   };
// }

// const findPerson: IHandler<Promise<IUser | null>> = async (params: IParams) => {
//   return await User.findById(params.urlParams!.id);
// };

// const getAllPeople: IHandler<IPerson[]> = () => {
//   return [
//     {
//       name: 'jo',
//       age: 32,
//     },
//   ];
// };

// app.post('/:id', handlerFactory(findPerson));
