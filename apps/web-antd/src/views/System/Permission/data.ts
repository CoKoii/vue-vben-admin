import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'roleName',
      label: '权限码名称',
      rules: 'required',
    },
    { component: 'Textarea', fieldName: 'description', label: '权限码描述' },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [{ component: 'Input', fieldName: 'roleName', label: '权限码名称' }];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { type: 'checkbox', width: 50, align: 'center' },
    { field: 'roleName', title: '权限码名称' },
    { field: 'description', title: '权限码描述' },
    {
      field: 'status',
      title: '权限码状态',
      slots: { default: 'status' },
    },
    {
      title: '操作',
      width: 150,
      align: 'center',
      fixed: 'right',
      slots: { default: 'action' },
    },
  ];
}
