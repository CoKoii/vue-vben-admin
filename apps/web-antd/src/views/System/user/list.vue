<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { registerApi, updateUserApi } from '#/api';
import { deleteRole, getAllUsers } from '#/api/core/system';

import { useColumns, useGridFormSchema } from './data';
import UserForm from './modules/form.vue';

const userFormRef = ref();

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: useGridFormSchema(), submitOnChange: true },
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) =>
          await getAllUsers({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          }),
      },
    },
    toolbarConfig: {
      custom: true,
      export: true,
      refresh: true,
      search: true,
      zoom: true,
    },
    exportConfig: {},
  },
});

const handleCreate = () => userFormRef.value?.open();
const handleEdit = (row: any) => userFormRef.value?.open(row);
const handleSubmit = async (values: any) => {
  await (values.id ? updateUserApi(values.id, values) : registerApi(values));
  message.success(values.id ? '更新成功' : '创建成功');
  await gridApi.grid?.commitProxy('query');
};
const handleDelete = (row: any) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户 "${row.username}" 吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      await deleteRole(row.id);
      message.success('删除成功');
      await gridApi.grid?.commitProxy('query');
    },
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="用户管理">
      <template #toolbar-tools>
        <Button type="primary" @click="handleCreate">
          <Plus class="size-5" />
          新建用户
        </Button>
      </template>
      <template #action="{ row }">
        <Button type="link" size="small" @click="handleEdit(row)">编辑</Button>
        <Button type="link" danger size="small" @click="handleDelete(row)">
          删除
        </Button>
      </template>
    </Grid>
    <UserForm ref="userFormRef" :on-submit="handleSubmit" />
  </Page>
</template>
