import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export const searchFormSchema: VbenFormSchema[] = [
  {
    component: 'Input',
    fieldName: 'username',
    label: '用户名称',
  },
];
export const tableColumns: VxeTableGridOptions['columns'] = [
  { title: '序号', type: 'seq', width: 50 },
  { type: 'checkbox', width: 50, align: 'center' },
  { field: 'username', title: '用户名称' },
];
