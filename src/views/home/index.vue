<template>
  <div class="bg-[#fff] rounded-4px mb-5px p-10px">
    <div>
      <span class="text-size-14px text-[#73767c]">欢迎使用系统！</span>
    </div>
  </div>
</template>
<script setup>
  import { LogUploaderSDK } from '@/utils/log';
  import { getToken } from '@/utils/auth';

  const sdk = new LogUploaderSDK('https://testxa.360scm.com');

  const logData = {
    logLevel: 'Info',
    content: '这是一条日志信息',
    token: getToken(),
  };
  sdk.uploadLog(logData);
</script>
