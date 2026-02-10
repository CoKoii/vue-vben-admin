import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

const formatDateTime = ({ cellValue }: any) =>
  cellValue ? new Date(cellValue).toLocaleString() : '';

export const editFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'code',
    label: '权限码名称',
    rules: 'required',
  },
  { component: 'Textarea', fieldName: 'description', label: '权限码描述' },
];

export const searchSchema: VbenFormSchema[] = [
  { component: 'Input', fieldName: 'code', label: '权限码名称' },
];

export const tableColumns: VxeTableGridOptions['columns'] = [
  { title: '序号', type: 'seq', width: 50 },
  { field: 'code', title: '权限码名称' },
  { field: 'description', title: '权限码描述' },
  {
    field: 'status',
    title: '权限码状态',
    slots: { default: 'status' },
  },
  {
    field: 'createdAt',
    title: '创建时间',
    width: 180,
    formatter: formatDateTime,
  },
  {
    field: 'updatedAt',
    title: '最后修改时间',
    width: 180,
    formatter: formatDateTime,
  },
  {
    title: '操作',
    width: 150,
    align: 'center',
    fixed: 'right',
    slots: { default: 'action' },
  },
];
