import { Article, Articles, Headers } from "../models";
import qs from "querystring";

export type ArticleQuery = {
  parent_id?: string | number;
  filters?: string;
};

export class ArticlesApi {
  constructor(private baseURL: string = "http://localhost:8080") { }

  async fetchHeaders(): Promise<Headers> {
    const respose = await fetch(`${this.baseURL}/articles/headers`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    return respose.json();
  }

  async fetchArticles(query: ArticleQuery = {}): Promise<Articles> {
    const queryStr = qs.stringify(query);
    const respose = await fetch(`${this.baseURL}/articles?${queryStr}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    return respose.json();
  }
}
