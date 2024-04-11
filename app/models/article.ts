import { Categories } from "./category";

export type Article = {
  id: string | number;
  parent_id?: null | number | string;
  parent?: Article;
  title: string;
  categories?: Categories;
  children?: Articles | null;
  is_expanded?: boolean | null;
};

export type Articles = Article[];
