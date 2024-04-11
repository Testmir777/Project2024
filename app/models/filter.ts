export type FilterValue = {
  key: string;
  value: string;
};
export type FilterValues = FilterValue[];

export type Filter = {
  id: string | number;
  title: string;
  value?: string | number;
  values: FilterValues;
};
export type Filters = Filter[];
