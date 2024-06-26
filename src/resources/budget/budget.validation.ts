import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    amount: Joi.number().greater(0).required(),
    type: Joi.string().required(),
    date: Joi.date().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
});

export default { create };
