import { PartialType } from '@nestjs/swagger';

import CreateBookDto from './create.book.dto';

class UpdateBookDto extends PartialType(CreateBookDto) {}

export default UpdateBookDto;
