<template>
  <div class="justify-center items-center flex h-screen w-screen" :class="bem()">
    <div class="rounded-4px bg-[#fff] w-450px py-5px px-30px items-center justify-center">
      <div class="-mt-60px items-center justify-center flex">
        <div
          class="bg-[#fff] rounded-full w-120px h-120px flex items-center justify-center border border-gray-100"
        >
          <n-image width="70" :src="LogoIcon" />
        </div>
      </div>
      <n-form
        ref="formRef"
        class="pt-20px"
        status-icon
        :rules="rules"
        :model="formData"
        :show-label="false"
      >
        <n-form-item path="token" label="token">
          <n-input
            v-model:value="formData.token"
            type="text"
            placeholder="请输入token"
            size="large"
          >
            <template #prefix>
              <n-icon size="14" color="#808695">
                <user />
              </n-icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item class="mt-10px">
          <n-button
            type="primary"
            size="large"
            round
            class="w-full"
            :loading="btnLoading"
            @click="submitData"
          >
            登 录
          </n-button>
        </n-form-item>
      </n-form>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'LoginPage',
  };
</script>

<script setup lang="ts">
  import { createBEM } from '@/utils/function/bem';
  import { User } from '@icon-park/vue-next';
  import { setToken } from '@/utils/auth';
  import { useRouter } from 'vue-router';
  import { useNotification } from 'naive-ui';
  import { validate } from '@/utils/function/form';
  import LogoIcon from '@/assets/icon/logo.svg';
  import { getAllResources, workerInst } from '@/utils/idb/index';
  import type { FormInst } from 'naive-ui';

  const formData = ref({
    token: '',
  });
  const rules = ref({
    token: [{ required: true, message: 'token不能为空', trigger: 'blur' }],
  });
  const formRef = ref<Nullable<FormInst>>(null);
  const btnLoading = ref(false);

  const bem = createBEM('login-page');
  const router = useRouter();
  const notification = useNotification();

  function submitData(): void {
    btnLoading.value = true;

    validate(unref(formRef))
      .then(() => {
        login().finally(() => {
          btnLoading.value = false;
        });
      })
      .catch(() => {
        btnLoading.value = false;
      });
  }

  async function login(): Promise<void> {
    notification.success({
      content: '提 示',
      meta: '登录成功',
      duration: 3000,
    });
    await setToken(unref(formData).token);
    await getAllResources().then(res => {
      workerInst.postMessage({ data: res });
    });
    router.replace('/home');
  }
</script>

<style lang="scss" scoped>
  .login-page {
    background: #f2f1f3 url('@/assets/images/loginBg.png');
    background-size: 340px;
  }
</style>
