import type { Request, Response, NextFunction } from "express"; 

const errorHandler = (error: Error, req: Request, res: Response<Error>, next: NextFunction) => {
  res.json(error);
};

export default errorHandler;