export type SelectOption = {
  label: string;
  value: string;
  resourceKey?: string;
};

export type SelectOptions = SelectOption[];

export type Dict = {
  key: string;
  value: SelectOptions;
};
