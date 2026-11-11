import type { Request, Response, NextFunction } from "express"; 
import type { ErrorResponse } from "../types/error.types.ts";

const errorHandler = (error: Error, _req: Request, res: Response<ErrorResponse>, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: error.message ?? "Internal server error" });
};

export default errorHandler;
