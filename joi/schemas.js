import Joi from 'joi';

export const post = Joi.object({
  title: Joi.string().required(),
  paragraph: Joi.string().required(),
  image: Joi.string(),
  author: Joi.string().required()
});