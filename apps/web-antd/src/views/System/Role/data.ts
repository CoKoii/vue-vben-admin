import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: '用户名称',
    },
  ];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { type: 'checkbox', width: 50, align: 'center' },
    { field: 'username', title: '用户名称' },
    { field: 'password', title: '用户密码' },
    {
      title: '操作',
      width: 150,
      align: 'center',
      fixed: 'right',
      slots: { default: 'action' },
    },
  ];
}
