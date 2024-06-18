import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    amount: Joi.number().required(),
    type: Joi.string().required(),
    date: Joi.date().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
});

export default { create };
