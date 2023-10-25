import Vue from 'vue';

export type DataTableHeader = Vue.DeepReadonly<DataTableHeaderItem[]>;

export type DataTableHeaderItem = Vue.DeepReadonly<{
  text: string;
  value: string;
}>;

export default DataTableHeaderItem;
