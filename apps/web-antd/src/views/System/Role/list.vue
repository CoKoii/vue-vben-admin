<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { Button, message, Modal, Switch, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { createRole, getAllRoles, updateRole } from '#/api/core/system';

import { useColumns, useGridFormSchema } from './data';
import RoleForm from './modules/form.vue';

const roleFormRef = ref();
const loadingStates = ref<Record<number, boolean>>({});

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
const handleEdit = (row: any) => {
  const formData = {
    ...row,
    permissions: row.permissions?.map((permission: any) => permission.id) || [],
  };
  roleFormRef.value?.open(formData);
};
const handleSubmit = async (values: any) => {
  await (values.id ? updateRole(values.id, values) : createRole(values));
  message.success(values.id ? '更新成功' : '创建成功');
  await gridApi.grid?.commitProxy('query');
};
const changeStatus = async (row: any) => {
  Modal.confirm({
    title: '确认操作',
    content: `确定要${row.status ? '禁用' : '启用'}角色 "${row.roleName}" 吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      loadingStates.value[row.id] = true;
      try {
        await updateRole(row.id, { status: !row.status });
        message.success('状态更新成功');
        await gridApi.grid?.commitProxy('query');
      } finally {
        loadingStates.value[row.id] = false;
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
      <template #permissions="{ row }">
        <Tag
          v-for="permission in row.permissions"
          style="margin-bottom: 0"
          :style="{
            textDecoration: permission.status ? 'none' : 'line-through',
          }"
          :key="permission.id"
          class="mb-2 mr-2"
          :bordered="permission.status"
          :color="permission.status ? 'blue' : 'default'"
        >
          {{ permission.code }}
        </Tag>
      </template>
      <template #status="{ row }">
        <Switch
          :checked="row.status"
          :loading="loadingStates[row.id]"
          checked-children="启用"
          un-checked-children="禁用"
          @change="() => changeStatus(row)"
        />
      </template>
      <template #action="{ row }">
        <Button type="link" size="small" @click="handleEdit(row)">编辑</Button>
      </template>
    </Grid>
    <RoleForm ref="roleFormRef" :on-submit="handleSubmit" />
  </Page>
</template>
