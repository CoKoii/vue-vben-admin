<script lang="ts" setup>
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, message, Modal, Switch, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { registerApi, updateUserApi } from '#/api';
import { getAllUsers } from '#/api/core/system';

import { useColumns, useGridFormSchema } from './data';
import UserForm from './modules/form.vue';

const userFormRef = ref();

const loadingStates = ref<Record<number, boolean>>({});
const getUniquePermissions = (roles: any[]) => {
  const permissionMap = new Map();

  roles?.forEach((role) => {
    role.permissions?.forEach((permission: any) => {
      const existing = permissionMap.get(permission.id);
      const isEnabled = permission.status && role.status;

      if (!existing) {
        permissionMap.set(permission.id, { ...permission, enabled: isEnabled });
      } else if (isEnabled && !existing.enabled) {
        existing.enabled = true;
      }
    });
  });

  return [...permissionMap.values()];
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: useGridFormSchema(), submitOnChange: true },
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

const changeStatus = async (row: any) => {
  console.warn('changeStatus', row);
  Modal.confirm({
    title: '确认操作',
    content: `确定要${row.status ? '禁用' : '启用'}用户 "${row.username}" 吗？`,
    okText: '确定',
    cancelText: '取消',
    onOk: async () => {
      loadingStates.value[row.id] = true;
      try {
        await updateUserApi(row.id, { status: !row.status });
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
    <Grid table-title="用户管理">
      <template #toolbar-tools> </template>
      <template #roles="{ row }">
        <Tag
          v-for="role in row.roles"
          style="margin-bottom: 0"
          :style="{
            textDecoration: role.status ? 'none' : 'line-through',
          }"
          :key="role.id"
          class="mb-2 mr-2"
          :bordered="role.status"
          :color="role.status ? 'blue' : 'default'"
        >
          {{ role.roleName }}
        </Tag>
      </template>
      <template #permissions="{ row }">
        <Tag
          v-for="permission in getUniquePermissions(row.roles)"
          style="margin-bottom: 0"
          :style="{
            textDecoration: permission.enabled ? 'none' : 'line-through',
          }"
          :key="permission.id"
          class="mb-2 mr-2"
          :bordered="permission.enabled"
          :color="permission.enabled ? 'blue' : 'default'"
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
    <UserForm ref="userFormRef" :on-submit="handleSubmit" />
  </Page>
</template>
