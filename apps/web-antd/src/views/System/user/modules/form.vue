<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

import { useFormSchema } from '../data';

const props = defineProps<{
  onSubmit: (values: any) => Promise<void>;
}>();

const isEdit = ref(false);
const editData = ref<any>(null);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      autocomplete: 'off',
    },
  },
  schema: useFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    modalApi.lock();
    try {
      await props.onSubmit({ ...values, id: editData.value?.id });
      modalApi.close();
    } catch {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen) {
    if (!isOpen) return;

    await formApi.resetForm();

    if (editData.value) {
      isEdit.value = true;
      await formApi.setValues(editData.value);
    } else {
      isEdit.value = false;
    }
  },
});

const modalTitle = computed(() => (isEdit.value ? '编辑用户' : '新建用户'));

function open(data?: any) {
  editData.value = data;
  modalApi.open();
}

defineExpose({ open });
</script>

<template>
  <Modal :title="modalTitle">
    <Form />
  </Modal>
</template>
