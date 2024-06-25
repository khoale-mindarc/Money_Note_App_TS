import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/budget/budget.validation';
import BudgetService from '@/resources/budget/budget.service';
import authenticated from '@/middleware/authenticated.middleware';

class BudgetController implements Controller {
    public path = '/budgets';
    public router = Router();
    public BudgetService = new BudgetService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, authenticated, this.getBudgets);

        this.router.post(
            `${this.path}/create`,
            [validationMiddleware(validate.create), authenticated],
            this.create,
        );

        this.router.post(
            `${this.path}/update`,
            [validationMiddleware(validate.create), authenticated],
            this.update,
        );
    }

    private getBudgets = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { type, date, month } = req.query;
            const parsedType = type ? (type as string) : null;
            const parsedDate = date ? new Date(date as string) : null;
            const parsedMonth = month ? new Date(month as string) : null;

            if (!req.user) {
                return next(
                    new HttpException(500, 'Unable to retrieve budgets'),
                );
            }

            const userId = req.user.id;

            const budgets = await this.BudgetService.get(
                userId,
                parsedType,
                parsedDate,
                parsedMonth,
            );
            return res.status(200).json({ budgets });
        } catch (error) {
            next(new HttpException(500, 'Unable to retrieve budgets'));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const { title, amount, type, date, category, description } =
                req.body;

            const userId = req.user.id;

            const budget = await this.BudgetService.create(
                userId,
                title,
                amount,
                type,
                date,
                category,
                description,
            );

            res.status(201).json({ budget });
        } catch (error) {
            next(new HttpException(400, 'Can not create budget'));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            const id = req.query.id as string;
            const { title, amount, type, date, category, description } =
                req.body;

            if (!id) {
                return next(new HttpException(400, 'Can not update budget'));
            }

            const userId = req.user.id;

            const budget = await this.BudgetService.update(
                id,
                userId,
                title,
                amount,
                type,
                date,
                category,
                description,
            );

            if (!budget) {
                return next(
                    new HttpException(400, 'Can not find budget by id'),
                );
            }

            res.status(200).json({ budget });
        } catch (error) {
            next(new HttpException(400, 'Can not update budget'));
        }
    };
}

export default BudgetController;
