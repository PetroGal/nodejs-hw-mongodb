import { HttpError } from 'http-errors';
import mongoose from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  console.error('Full error:', err);

  // Перевірка, чи отримали ми помилку від createHttpError
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }
  // Handle Mongoose validation and duplicate key errors
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      status: 400,
      message: 'Validation Error',
      errors: err.errors, // Provide validation errors if available
    });
    return;
  }

  // Handle duplicate key errors (like duplicate email)
  if (err.code === 11000) {
    res.status(409).json({
      status: 409,
      message: 'Duplicate key error',
      error: `Duplicate value for: ${Object.keys(err.keyValue).join(', ')}`,
    });
    return;
  }
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
};
