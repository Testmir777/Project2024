import Filter, { IProps as IFilter } from "./filter";
export type IFilters = IFilter[];

export interface IProps {
  filters?: IFilters;
  onChange?: (id: string | number, value: string | number) => void;
}

export default function Filters(props: IProps) {
  return (
    <form className="flex mx-auto">
      {props.filters?.map((filter) => (
        <Filter
          key={filter.id}
          {...filter}
          onChange={props.onChange}
        >
        </Filter>
      ))}
    </form>
  );
}
