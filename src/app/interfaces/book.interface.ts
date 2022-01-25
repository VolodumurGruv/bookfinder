export interface Book {
  id: string;
  totalItems: number;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    subtitle?: string;
    publishedDate?: Date;
    previewLink?: string;
    language?: string;
  };
}
