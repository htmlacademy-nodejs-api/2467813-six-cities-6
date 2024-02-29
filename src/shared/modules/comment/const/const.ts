import { Rating } from '../../../const/index.js';

export const DEFAULT_COMMENT_COUNT = 50;
export const COMMENT_CONTROLLER = 'CommentController';

export const Text = {
  Min: 5,
  Max: 1024,
} as const;

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `min length is ${Text.Min}, max is ${Text.Max}`,
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: `Min length for rating path is ${Rating.Min}`,
    maxValue: `Max length for rating path is ${Rating.Max}`,
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id',
  },
} as const;
