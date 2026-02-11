<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal, Switch } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createPermission,
  getAllPermissions,
  updatePermission,
} from '#/api/core/system';

import { searchSchema, tableColumns } from './data';
import FormModal from './modules/form.vue';

const formModalRef = ref();
const loadingStates = ref<Record<number, boolean>>({});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: searchSchema, submitOnChange: true },
  gridOptions: {
    columns: tableColumns,
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: ({ page }: any, formValues: any) =>
          getAllPermissions({
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

const handleCreate = () => formModalRef.value?.open();
const handleEdit = (row: any) => formModalRef.value?.open(row);

const refreshGrid = () => gridApi.grid?.commitProxy('query');

const handleSubmit = async (values: any, id?: number) => {
  await (id ? updatePermission(id, values) : createPermission(values));
  message.success(id ? '更新成功' : '创建成功');
  await refreshGrid();
};

const changeStatus = (row: any) => {
  Modal.confirm({
    title: '确认操作',
    content: `确定要${row.status ? '禁用' : '启用'}权限码 "${row.code}" 吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      loadingStates.value[row.id] = true;
      try {
        await updatePermission(row.id, { status: !row.status });
        message.success('状态更新成功');
        await refreshGrid();
      } finally {
        loadingStates.value[row.id] = false;
      }
    },
  });
};
</script>

<template>
  <Page auto-content-height>
    <Grid table-title="权限码管理">
      <template #toolbar-tools>
        <Button type="primary" @click="handleCreate">
          <Plus class="size-5" />
          新建权限码
        </Button>
      </template>
      <template #status="{ row }">
        <Switch
          :checked="row.status"
          :loading="loadingStates[row.id]"
          checked-children="启用"
          un-checked-children="禁用"
          @change="changeStatus(row)"
        />
      </template>
      <template #action="{ row }">
        <Button type="link" size="small" @click="handleEdit(row)">编辑</Button>
      </template>
    </Grid>
    <FormModal ref="formModalRef" :on-submit="handleSubmit" />
  </Page>
</template>
