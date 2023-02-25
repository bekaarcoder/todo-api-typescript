import { body, ValidationChain } from 'express-validator';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

export const createValidator: ValidationChain[] = [
  body('title')
    .not()
    .isEmpty()
    .withMessage('Title is required.')
    .trim()
    .isString()
    .withMessage('Title should be in text format.'),
  body('date')
    .not()
    .isEmpty()
    .withMessage('Date is required')
    .isString()
    .withMessage('Invalid Date'),
  body('description')
    .trim()
    .isString()
    .withMessage('Description should be in text format'),
  body('priority')
    .trim()
    .isIn([Priority.normal, Priority.low, Priority.high])
    .withMessage('Priority can only be normal, low or high'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Priority can only be todo, inProgress or completed'),
];

export const updateValidator = [
  body('id')
    .not()
    .isEmpty()
    .withMessage('Task id is required')
    .trim()
    .isString()
    .withMessage('ID is not valid'),
  body('status')
    .trim()
    .isIn([Status.todo, Status.inProgress, Status.completed])
    .withMessage('Priority can only be todo, inProgress or completed'),
];
