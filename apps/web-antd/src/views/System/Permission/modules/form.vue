<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { editFormSchema } from '../data';

const props = defineProps<{
  onSubmit: (values: any, id?: number) => Promise<void>;
}>();

const editData = ref<any>(null);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      autocomplete: 'off',
    },
  },
  schema: editFormSchema,
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    modalApi.lock();
    try {
      await props.onSubmit(values, editData.value?.id);
      modalApi.close();
    } catch {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen) {
    if (!isOpen) return;

    await formApi.resetForm();

    if (editData.value) {
      await formApi.setValues(editData.value);
    }
  },
});

const modalTitle = computed(() =>
  editData.value ? '编辑权限码' : '新建权限码',
);

function open(data?: any) {
  editData.value = data ?? null;
  modalApi.open();
}

defineExpose({ open });
</script>

<template>
  <Modal :title="modalTitle">
    <Form />
  </Modal>
</template>
