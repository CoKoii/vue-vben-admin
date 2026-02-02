<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { createRole, getAllRoles, updateRole } from '#/api/core/system';

import { useColumns, useGridFormSchema } from './data';
import RoleForm from './modules/form.vue';

const roleFormRef = ref();

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: useGridFormSchema(), submitOnChange: true },
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) =>
          await getAllRoles({
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

const handleCreate = () => roleFormRef.value?.open();
const handleEdit = (row: any) => roleFormRef.value?.open(row);
const handleSubmit = async (values: any, callback: any) => {
  try {
    await (values.id ? updateRole(values.id, values) : createRole(values));
    message.success(values.id ? '更新成功' : '创建成功');
    await gridApi.grid?.commitProxy('query');
    callback.success();
  } catch {
    callback.error();
  }
};
const handleDelete = (row: any) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除角色 "${row.name}" 吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      try {
        // TODO: 调用删除 API - await deleteRole(row.id);
        message.success('删除成功');
        await gridApi.grid?.commitProxy('query');
      } catch {
        message.error('删除失败');
      }
    },
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="角色管理">
      <template #toolbar-tools>
        <Button type="primary" @click="handleCreate">
          <Plus class="size-5" />
          新建角色
        </Button>
      </template>
      <template #action="{ row }">
        <Button type="link" size="small" @click="handleEdit(row)">编辑</Button>
        <Button type="link" danger size="small" @click="handleDelete(row)">
          删除
        </Button>
      </template>
    </Grid>
    <RoleForm ref="roleFormRef" @submit="handleSubmit" />
  </Page>
</template>
