import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'code',
      label: '权限码名称',
      rules: 'required',
    },
    { component: 'Textarea', fieldName: 'description', label: '权限码描述' },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [{ component: 'Input', fieldName: 'code', label: '权限码名称' }];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
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
