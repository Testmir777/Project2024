export type FilterValue = {
  key: string;
  value: string;
};
export type FilterValues = FilterValue[];

export interface IProps {
  id: string | number;
  title: string;
  value?: string | number;
  values?: FilterValues;
  onChange?: (id: string | number, value: string | number) => void;
}

export default function Filter(props: IProps) {
  return (
    <div>
      <label className="mb-2 text-sm font-medium text-black">
        {props.title}
      </label>
      <select
        className="p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        value={props.value}
        onChange={(value) =>
          props.onChange && props.onChange(props.id, value.target.value)}
      >
        {props.values?.map((value) => (
          <option key={value.key} value={value.key}>{value.value}</option>
        ))}
      </select>
    </div>
  );
}
