import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import PostController from '@/resources/post/post.controller';
import BudgetController from '@/resources/budget/budget.controller';

validateEnv();

const app = new App(
    [new PostController(), new BudgetController()],
    Number(process.env.PORT),
);

app.listen();
