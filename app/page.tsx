"use client";
import ArticlesTable from "@/components/artcile/articles-table";
// import { articles, filters, headers } from "../sample.json";
import { Article, Articles, Header, Headers } from "./models";
import { useEffect, useState } from "react";
import Filters from "@/components/artcile/filter/filters";
import { IProps as IFilter } from "@/components/artcile/filter/filter";
import { FiltersApi } from "./api/filters";
import { ArticleQuery, ArticlesApi } from "./api/articles";
export type IFilters = IFilter[];

export default function Page() {
  const [articles, setArticles] = useState<Articles>([]);
  const [tableHeaders, setTableHeaders] = useState<Headers>([]);
  const [tableFilters, setTableFilters] = useState<IFilters>([]);

  const toggleCollapse = (model: Article): void => {
    (async () => {
      if (model.is_expanded === true) {
        model.is_expanded = false;
      } else {
        if (model.children === undefined) {
          const articlesApi = new ArticlesApi();
          model.children = await articlesApi.fetchArticles({
            parent_id: model.id,
          });
          model.children = model.children?.map((x) => ({
            ...x,
            parent: model,
          }));
        }
        if (!model.children?.length) {
          model.is_expanded = null;
        } else {
          model.is_expanded = true;
        }
      }
      setArticles([...articles]);
    })();
  };

  const toggleHeader = (header: Header): void => {
    const getChildren = (header: Header): Headers =>
      tableHeaders.filter((h) => h.parent_id && h.parent_id === header.id);

    // Toggle header state and it's children
    if (!header.expanded) {
      header.expanded = true;
      header.visible = true;
      getChildren(header).forEach((h) => {
        h.visible = true;
      });
    } else {
      // Toggle children status
      const children: Headers = [header];
      do {
        const currentHeader = children.shift();
        if (currentHeader) {
          currentHeader.expanded = false;
          if (header !== currentHeader) {
            currentHeader.visible = false;
          }
          children.push(...getChildren(currentHeader));
        }
      } while (children.length > 0);
    }
    setTableHeaders([...tableHeaders]);
  };

  const changeFilter = (id: string | number, value: string | number): void => {
    const filter = tableFilters.find((x) => x.id === id);
    if (filter) {
      filter.value = value;
      setTableFilters([...tableFilters]);
    }
  };

  useEffect(() => {
    (async () => {
      const filters = await new FiltersApi().fetchFilters();
      setTableFilters(filters);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const articlesApi = new ArticlesApi();

      const headers = await articlesApi.fetchHeaders();
      setTableHeaders(headers);

      const query: ArticleQuery = {
        filters: JSON.stringify(
          tableFilters.reduce(
            (res, filter) => ({ [filter.id]: filter.value, ...res }),
            {},
          ),
        ),
      };
      const articlesData = await articlesApi.fetchArticles(query);
      setArticles(articlesData);
    })();
  }, [tableFilters]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-full w-full">
        <Filters filters={tableFilters} onChange={changeFilter} />

        <ArticlesTable
          model={articles}
          headers={tableHeaders}
          toggleCollapse={toggleCollapse}
          toggleHeader={toggleHeader}
        />
      </div>
    </main>
  );
}
