export interface Book {
  title: string;
  authors: string[];
  categories: string[];
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}
