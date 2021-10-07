import { GetUserDto } from './dto';
import { IUserDto } from './user.interfaces';
import { User } from './user.model';

class UserMapper {
  public static toModel<T extends IUserDto>(dto: T): User {
    const user: User = new User();
    user.username = dto.username;
    user.email = dto.email;
    if (dto.password) {
      user.password = dto.password;
    }
    return user;
  }

  public static toDto(model: User): GetUserDto {
    const { id, username, email } = model;
    const userDto: GetUserDto = { id, username, email };
    return userDto;
  }
}

export default UserMapper;
