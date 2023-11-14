import express from "express";
import { Request, Response, NextFunction } from "express";
import httpError from "http-errors";

export default class NotFoundError extends Error {
  static errorHandler(req: Request, res: Response, next: NextFunction) {
    const err: httpError.HttpError = new httpError.NotFound();
    next(err);
  }
}
