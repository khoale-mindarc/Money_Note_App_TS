import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/category/category.validation';
import CategoryService from '@/resources/category/category.service';
import authenticated from '@/middleware/authenticated.middleware';

class CategoryController implements Controller {
    public path = '/categories';
    public router = Router();
    public CategoryService = new CategoryService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.get);

        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.data),
            this.create,
        );

        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validate.data),
            this.update,
        );

        this.router.delete(`${this.path}/delete`, this.delete);
    }

    private get = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { type } = req.query;
            const parsedType = type ? (type as string) : null;

            const categories = await this.CategoryService.get(
                parsedType
            );
            return res.status(200).json({ categories });
        } catch (error) {
            next(new HttpException(500, 'Unable to retrieve categories'));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { title, type, description, image } =
                req.body;

            const category = await this.CategoryService.create(
                title,
                type,
                description,
                image
            );

            res.status(201).json({ category });
        } catch (error) {
            next(new HttpException(400, 'Can not create category'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const id = req.query.id as string;
            const { title, type, description, image } =
                req.body;

            const category = await this.CategoryService.update(
                id,
                title,
                type,
                description,
                image
            );

            if (!category) {
                return next(
                    new HttpException(400, 'Can not find category by id'),
                );
            }

            res.status(200).json({ category });
        } catch (error) {
            next(new HttpException(400, 'Can not update category'));
        }
    };

    private delete = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const id = req.query.id as string;
            if (!id) {
                next(new HttpException(400, 'ID cateogory is required'));
            }

            await this.CategoryService.delete(id);
            res.status(200).json({ message: 'Category Deleted!' });
        } catch (error) {
            next(new HttpException(400, 'Can not delete category'));
        }
    };
}

export default CategoryController;
