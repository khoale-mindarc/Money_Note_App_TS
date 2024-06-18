import BudgetModel from '@/resources/budget/budget.model';
import Budget from '@/resources/budget/budget.interface';
import {
    startOfDay,
    endOfDay,
    startOfMonth,
    endOfMonth,
    isValid,
} from 'date-fns';

class BudgetService {
    private budget = BudgetModel;

    /**
     * Create a new Budget
     */
    public async create(
        title: string,
        amount: number,
        type: string,
        date: Date,
        category: string,
        description: string,
    ): Promise<Budget> {
        try {
            const budget = await this.budget.create({
                title,
                amount,
                type,
                date,
                category,
                description,
            });

            return budget;
        } catch (error) {
            throw new Error('Unable to create budget');
        }
    }

    /**
     * List Budgets by date and type
     * @param date The date to filter by
     * @param type The type to filter by
     */
    public async getBudgets(
        type: string | null | undefined,
        date: Date | null | undefined,
        month: Date | null | undefined,
    ): Promise<Budget[]> {
        try {
            let query: any;
            if (type) {
                query = {
                    type: type,
                };
            }

            if (date && isValid(date)) {
                // If date is provided and valid, use day range
                const start = startOfDay(date);
                const end = endOfDay(date);

                query.date = {
                    $gte: start,
                    $lte: end,
                };
            } else if (month && isValid(month)) {
                // If month is provided and valid, use month range
                const start = startOfMonth(month);
                const end = endOfMonth(month);

                query.date = {
                    $gte: start,
                    $lte: end,
                };
            }

            console.log(query);

            const budgets = await this.budget.find(query);
            return budgets;
        } catch (error) {
            throw new Error('Unable to retrieve budgets by date and type');
        }
    }
}

export default BudgetService;
