import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export function useGridFormSchema(): VbenFormSchema[] {
  return [{ component: 'Input', fieldName: 'username', label: '用户名称' }];
}
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'username',
      label: '用户名称',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      fieldName: 'password',
      label: '用户密码',
      rules: 'required',
    },
    {
      component: 'InputPassword',
      fieldName: 'confirmPassword',
      label: '确认密码',
      rules: 'required',
    },
    {
      component: 'Checkbox',
      fieldName: 'agreePolicy',
      label: '我已阅读并同意用户协议和隐私政策',
      rules: 'requiredTrue',
      defaultValue: true,
      hide: true,
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
