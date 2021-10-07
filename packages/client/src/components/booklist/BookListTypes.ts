export type Book = {
  id: string;
  title: string;
  category: { id: string; name: string };
  publisher: { id: string; name: string };
  authors: Array<{ id: string; name: string }>;
  price: number;
  discount: number;
  ageLimit: number;
  publicationYear: number;
  numberOfPages: number;
  format: string[];
  vendor: string;
  rating: number;
  image?: string;
};

export type BookListProps = {
  books: Book[];
};

export type BookListItemProps = {
  key: string;
  book: Book;
};

export type Discount = {
  price: number;
  discount: number;
};
