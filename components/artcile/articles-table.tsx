"use client";

import "./style.css";
import { useEffect, useState } from "react";
import { Article, Articles as ArticlesType } from "@/app/models";
import ArticleRow from "./article-row";
import TableHeader from "./table-header";

import { Header, Headers } from "@/app/models";
import TableToggleStyle from "./table-toggle-style";

export interface IProps {
  model: ArticlesType;
  headers: Headers;
  toggleCollapse: (model: Article) => void;
  toggleHeader: (header: Header) => void;
}

export default function ArticlesTable(props: IProps) {
  const [visibleHeaders, setVisibleHeaders] = useState<Headers>([]);

  // Update visible columns
  useEffect(
    () => {
      const categories = props.model[0]?.categories ?? [];
      const existingHeaders = categories.map((x) => x.id) ?? [];
      const v = props.headers.filter((p) =>
        existingHeaders.includes(p.id) && p.visible
      );
      setVisibleHeaders(v);
    },
    [props.headers, props.model],
  );

  // Use Zebra style
  const [hasStyle, setHasStyle] = useState(false);

  return (
    <>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th colSpan={2} className="text-left" >
              <TableToggleStyle
                checked={hasStyle}
                title="Use zebra style"
                onChanged={setHasStyle}
              />
            </th>
            {visibleHeaders.map((header) => (
              <TableHeader
                key={header.id}
                model={header}
                toggleHeader={props.toggleHeader}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {props.model.map((article) => (
            <ArticleRow
              hasStyle={hasStyle}
              key={article.id}
              indentLevel={0}
              toggleCollapse={props.toggleCollapse}
              visibleHeaders={visibleHeaders}
              model={article}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}
