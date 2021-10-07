import { Book } from '../../booklist/BookListTypes';

export type SearchDropdownProps = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export type SearchDropdownItemProps = {
  book: Book;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};
