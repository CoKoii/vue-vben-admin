import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export const searchFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'category',
    label: 'Category',
  },
  {
    component: 'Input',
    fieldName: 'productName',
    label: 'ProductName',
  },
  {
    component: 'Input',
    fieldName: 'price',
    label: 'Price',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      options: [
        {
          label: 'Color1',
          value: '1',
        },
        {
          label: 'Color2',
          value: '2',
        },
      ],
      placeholder: '请选择',
    },
    fieldName: 'color',
    label: 'Color',
  },
  {
    component: 'RangePicker',
    fieldName: 'date',
    label: 'Date',
  },
];
export const tableColumns: VxeTableGridOptions['columns'] = [
  { title: '序号', type: 'seq', width: 50 },
  { align: 'left', title: 'Name', type: 'checkbox', width: 100 },
  { field: 'category', title: 'Category' },
  { field: 'color', title: 'Color' },
  { field: 'productName', title: 'Product Name' },
  { field: 'price', title: 'Price' },
  { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
];
