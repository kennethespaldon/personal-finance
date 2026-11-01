import type { Request, Response, NextFunction } from "express"; 

const errorHandler = (error: Error, _req: Request, res: Response<Error>, _next: NextFunction) => {
  res.json(error);
};

export default errorHandler;