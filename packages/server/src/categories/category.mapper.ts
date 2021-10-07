import { Category } from './category.model';
import { ICategoryDto } from './category.interfaces';
import { GetCategoryDto } from './dto/category.dto';

class CategoryMapper {
  public static toModel<T extends ICategoryDto>(dto: T): Category {
    const category: Category = new Category();
    category.name = dto.name;
    return category;
  }

  public static toDto(model: Category): GetCategoryDto {
    const categoryDto: GetCategoryDto = {
      id: model.id,
      name: model.name,
    };
    return categoryDto;
  }
}

export default CategoryMapper;
