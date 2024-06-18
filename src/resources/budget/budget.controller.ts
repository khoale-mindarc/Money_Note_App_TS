import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/budget/budget.validation';
import BudgetService from '@/resources/budget/budget.service';

class BudgetController implements Controller {
    public path = '/budgets';
    public router = Router();
    public BudgetService = new BudgetService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(`${this.path}`, this.getBudgets);

        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            this.create,
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

            const budgets = await this.BudgetService.getBudgets(
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

            const budget = await this.BudgetService.create(
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
}

export default BudgetController;
