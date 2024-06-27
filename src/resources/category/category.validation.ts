import Joi from 'joi';

const data = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
});

export default { data };
