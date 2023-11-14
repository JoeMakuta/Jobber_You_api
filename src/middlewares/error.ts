import express from "express";
import httpError from "http-errors";

export default class ExpressError extends Error {
  static errorHandler(
    error: httpError.HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.status(error.statusCode || 500).json({
      status: error.statusCode || 500,
      message: error.message,
      error: error,
      data: null,
    });
  }
}
