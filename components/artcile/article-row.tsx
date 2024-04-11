import { Article, Categories, Header, Headers } from "@/app/models";
import { useEffect, useState } from "react";

export interface IProps {
  model: Article;
  indentLevel: number;
  toggleCollapse: (model: Article) => void;
  visibleHeaders: Headers;
  hasStyle: string;
}

export default function ArticleRow(props: IProps) {
  const [visibleCategories, setVisibleCategories] = useState<Categories>([]);

  useEffect(() => {
    const expandedHeaders = props.visibleHeaders.filter((x: Header) =>
      x.visible
    ).map(
      (x: Header) => x.id,
    );
    const v = props.model.categories?.filter((cat) =>
      expandedHeaders.includes(cat.id)
    ) ?? [];
    setVisibleCategories(v);
  }, [props.visibleHeaders, props.model.categories]);

  return (
    <>
      <tr className={`has-style-${props.hasStyle}`}>
        <td className="text-left">
          {props.hasStyle}
          {props.model.is_expanded !== null &&
            (
              <button onClick={() => props.toggleCollapse(props.model)}>
                {props.model.is_expanded ? ">" : "<"}
              </button>
            )}
          <span style={{ paddingLeft: `${props.indentLevel}em` }}>
            {props.model.title}
          </span>
        </td>
        <td className="text-left">Units</td>
        {visibleCategories.map((x) => (
          <td className="text-right" key={x.id}>{x.unit}</td>
        ))}
      </tr>
      <tr className={`has-style-${props.hasStyle}`} >
        <td></td>
        <td className="text-left">Unit Price</td>
        {visibleCategories.map((x) => (
          <td className="text-right" key={x.id}>{x.unit_price}</td>
        ))}
      </tr>
      <tr className={`has-style-${props.hasStyle}`}>
        <td></td>
        <td className="text-left">Gross Revenue</td>
        {visibleCategories.map((x) => (
          <td className="text-right" key={x.id}>{x.gross_revenue}</td>
        ))}
      </tr>
      {props.model.is_expanded && props.model.children &&
        props.model.children.map((article) => (
          <ArticleRow
            hasStyle={props.hasStyle}
            key={article.id}
            model={article}
            indentLevel={props.indentLevel + 1}
            visibleHeaders={props.visibleHeaders}
            toggleCollapse={props.toggleCollapse}
          />
        ))}
    </>
  );
}
