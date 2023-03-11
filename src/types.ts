export interface NewsItem {
  id: number;
  title: string;
  url: string;
  date: Date;
  author: string;
  rating: number;
  countComments: number;
  kids: number[];
  text: string;
  parent: string;
}