export interface IOption {
  label?: string;
  value?: string;
}

export interface IFilter {
  label: string;
  key: string;
  values: IOption[];
}
