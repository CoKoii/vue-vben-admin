import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'roleName',
      label: '角色名称',
      rules: 'required',
    },
    { component: 'Textarea', fieldName: 'description', label: '角色描述' },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [{ component: 'Input', fieldName: 'roleName', label: '角色名称' }];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { type: 'checkbox', width: 50, align: 'center' },
    { field: 'roleName', title: '角色名称' },
    { field: 'description', title: '角色描述' },
    {
      title: '操作',
      width: 150,
      align: 'center',
      fixed: 'right',
      slots: { default: 'action' },
    },
  ];
}
