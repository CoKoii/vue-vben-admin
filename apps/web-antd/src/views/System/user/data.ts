import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { getAllRoles } from '#/api/core/system';

export function useGridFormSchema(): VbenFormSchema[] {
  return [{ component: 'Input', fieldName: 'nickname', label: '用户名称' }];
}

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'profile.nickname',
      label: '用户名称',
      rules: 'required',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        style: { width: '100%' },
        api: getAllRoles,
        resultField: 'items',
        labelField: 'roleName',
        valueField: 'id',
        showSearch: true,
        filterOption: (input: string, option: any) =>
          option.label.toLowerCase().includes(input.toLowerCase()),
        mode: 'multiple',
      },
      fieldName: 'roles',
      label: '用户角色',
    },
  ];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'username', title: '账户' },
    { field: 'profile.nickname', title: '用户名称' },
    {
      field: 'status',
      title: '账户状态',
      slots: { default: 'status' },
    },
    {
      field: 'roles',
      title: '用户角色',
      slots: { default: 'roles' },
    },
    {
      field: 'permissions',
      title: '用户权限',
      slots: { default: 'permissions' },
    },
    {
      field: 'createdAt',
      title: '创建时间',
      width: 180,
      formatter: ({ cellValue }) =>
        cellValue && new Date(cellValue).toLocaleString(),
    },
    {
      field: 'updatedAt',
      title: '最后修改时间',
      width: 180,
      formatter: ({ cellValue }) =>
        cellValue && new Date(cellValue).toLocaleString(),
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
