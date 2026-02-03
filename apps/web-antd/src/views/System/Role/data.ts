import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { getAllPermissions } from '#/api/core/system';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'roleName',
      label: '角色名称',
      rules: 'required',
    },
    { component: 'Textarea', fieldName: 'description', label: '角色描述' },
    {
      component: 'ApiSelect',
      componentProps: {
        style: { width: '100%' },
        api: getAllPermissions,
        resultField: 'items',
        labelField: 'code',
        valueField: 'id',
        showSearch: true,
        filterOption: (input: string, option: any) =>
          option.label.toLowerCase().includes(input.toLowerCase()),
        mode: 'multiple',
      },
      fieldName: 'permissions',
      label: '权限码',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [{ component: 'Input', fieldName: 'roleName', label: '角色名称' }];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'roleName', title: '角色名称' },
    { field: 'description', title: '角色描述' },
    {
      field: 'permissions',
      title: '权限码',
      slots: { default: 'permissions' },
    },
    {
      field: 'status',
      title: '角色状态',
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
