import CategoryModel from '@/resources/category/category.model';
import Category from '@/resources/category/category.interface';

class CategoryService {
    private category = CategoryModel;

    /**
     * Create a new Category
     */
    public async create(
        title: string,
        type: string,
        description: string,
        image: string
    ): Promise<Category> {
        try {
            const category = await this.category.create({
                title,
                type,
                description,
                image
            });

            return category;
        } catch (error) {
            throw new Error('Unable to create category');
        }
    }

    /**
     * Update a new Category
     */
    public async update(
        id: string,
        title: string,
        type: string,
        description: string,
        image: string
    ): Promise<Category | null> {
        try {
            const category = await this.category.findOne({
                _id: id,
            });
            if (!category) {
                return null;
            }

            category.title = title;
            category.type = type;
            category.description = description;
            category.image = image;
            category.save();

            return category;
        } catch (error) {
            throw new Error('Unable to create category');
        }
    }

    /**
     * List Budgets by type
     * 
     */
    public async get(
        type: string | null | undefined,
    ): Promise<Category[]> {
        try {
            let query: object = {};
            if (type) {
                query = {
                    type: type,
                };
            }

            const categories = await this.category.find(query);
            return categories;
        } catch (error) {
            throw new Error('Unable to retrieve categories by type');
        }
    }

    /**
     * Delete a Category
     */
    public async delete(id: string): Promise<void> {
        try {
            await this.category.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Unable to delete category');
        }
    }
}

export default CategoryService;
