<script lang="ts" setup>
import { Page } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getAllUsers } from '#/api/core/system';

import { useColumns, useGridFormSchema } from './data';

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }: any, formValues: any) => {
          return await getAllUsers({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
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

// 编辑用户
const handleEdit = (row: any) => {
  message.info(`编辑用户: ${row.username}`);
  // TODO: 实现编辑逻辑，比如打开编辑对话框
};

// 删除用户
const handleDelete = (row: any) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户 "${row.username}" 吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      try {
        // TODO: 调用删除 API
        // await deleteUser(row.id);
        message.success('删除成功');
        // 刷新表格
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
    <Grid table-title="用户管理">
      <template #toolbar-tools>
        <Button type="primary">
          <Plus class="size-5" />
          新建用户
        </Button>
      </template>
      <template #action="{ row }">
        <Button type="link" size="small" @click="handleEdit(row)">
          编辑
        </Button>
        <Button type="link" danger size="small" @click="handleDelete(row)">
          删除
        </Button>
      </template>
    </Grid>
  </Page>
</template>
