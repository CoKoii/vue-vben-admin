<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, message, Modal, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteUserApi, registerApi, updateUserApi } from '#/api';
import { getAllUsers } from '#/api/core/system';

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

const handleEdit = (row: any) => {
  const formData = {
    ...row,
    roles: row.roles?.map((role: any) => role.id) || [],
  };
  userFormRef.value?.open(formData);
};
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
      await deleteUserApi(row.id);
      message.success('删除成功');
      await gridApi.grid?.commitProxy('query');
    },
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="用户管理">
      <template #toolbar-tools> </template>
      <template #roles="{ row }">
        <Tag
          v-for="role in row.roles"
          style="margin-bottom: 0"
          :key="role"
          class="mb-2 mr-2"
          color="blue"
        >
          {{ role.roleName }}
        </Tag>
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
