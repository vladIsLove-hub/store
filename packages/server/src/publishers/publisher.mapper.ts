import { GetPublisherDto } from './dto/publisher.dto';
import { IPublisherDto } from './publisher.interfaces';
import { Publisher } from './publisher.model';

class PublisherMapper {
  public static toModel<T extends IPublisherDto>(dto: T): Publisher {
    const publisher: Publisher = new Publisher();
    publisher.name = dto.name;
    return publisher;
  }

  public static toDto(model: Publisher): GetPublisherDto {
    const publisherDto: GetPublisherDto = {
      id: model.id,
      name: model.name,
    };
    return publisherDto;
  }
}

export default PublisherMapper;
