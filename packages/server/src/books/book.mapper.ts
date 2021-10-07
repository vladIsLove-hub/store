import { Book } from './book.model';
import { IBookDto, IBookRelations } from './book.interfaces';
import GetBookDto from './dto/get.book.dto';
import UpdateBookDto from './dto/update.book.dto';

class BookMapper {
  public static toModel<T extends IBookDto>(dto: T, relationsModel: IBookRelations) {
    const book: Book = new Book();
    book.title = dto.title;
    book.category = relationsModel.category;
    book.publisher = relationsModel.publisher;
    book.authors = relationsModel.authors;
    book.price = dto.price;
    book.discount = dto.discount;
    book.ageLimit = dto.ageLimit;
    book.publicationYear = dto.publicationYear;
    book.numberOfPages = dto.numberOfPages;
    book.format = dto.format;
    book.vendor = dto.vendor;
    book.rating = dto.rating;
    book.image = dto.image ? dto.image : '';
    return book;
  }

  public static toDto(model: Book): GetBookDto {
    const bookDto: GetBookDto = {
      id: model.id,
      title: model.title,
      category: model.category,
      publisher: model.publisher,
      authors: model.authors,
      price: model.price,
      discount: model.discount,
      ageLimit: model.ageLimit,
      publicationYear: model.publicationYear,
      numberOfPages: model.numberOfPages,
      format: model.format,
      vendor: model.vendor,
      rating: model.rating,
      image: model.image,
    };
    return bookDto;
  }

  public static patchBookDtoToBook(book: Book, updateDto: UpdateBookDto): Book {
    const { title, ageLimit, discount, format, image, numberOfPages, price, publicationYear, rating, vendor } =
      updateDto;

    if (title) {
      book.title = title;
    }

    if (ageLimit) {
      book.ageLimit = ageLimit;
    }

    if (format) {
      book.format = format;
    }

    if (image) {
      book.image = image;
    }

    if (discount) {
      book.discount = discount;
    }

    if (numberOfPages) {
      book.numberOfPages = numberOfPages;
    }

    if (price) {
      book.price = price;
    }

    if (rating) {
      book.rating = rating;
    }

    if (publicationYear) {
      book.publicationYear = publicationYear;
    }

    if (vendor) {
      book.vendor = vendor;
    }

    if (numberOfPages) {
      book.numberOfPages = numberOfPages;
    }

    return book;
  }
}

export default BookMapper;
