export type Header = {
  id: string | number;
  title: string | number;
  visible?: boolean;
  parent_id?: string | number | null;
  expanded?: boolean;
};
export type Headers = Header[];
