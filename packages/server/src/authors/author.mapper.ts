import { IAuthorDto } from './author.interfaces';
import { Author } from './author.model';
import { GetAuthorDto } from './dto/author.dto';

class AuthorMapper {
  public static toModel<T extends IAuthorDto>(dto: T): Author {
    const author: Author = new Author();
    author.name = dto.name;
    return author;
  }

  public static toDto(model: Author): GetAuthorDto {
    const authorDto: GetAuthorDto = {
      id: model.id,
      name: model.name,
    };
    return authorDto;
  }
}

export default AuthorMapper;
