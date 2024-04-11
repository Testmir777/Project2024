import { Header } from "@/app/models";

export interface IProps {
  model: Header;
  toggleHeader: (header: Header) => void;
}

export default function TableHeader(props: IProps) {
  return (
    <th className="category">
      {props.model.title}
      <button
        className="expandable"
        onClick={() => props.toggleHeader(props.model)}
      >
        {props.model.expanded ? "<" : ">"}
      </button>
    </th>
  );
}
