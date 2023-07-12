<template>
  <qt-page-header :value="activedKey" :options="menuOptions" @update:value="onUpdateValue">
    <template #left>
      <div class="w-120px">
        <n-image width="120" height="40" preview-disabled object-fit="contain" :src="LogoIcon" />
      </div>
    </template>
    <template #right>
      <n-dropdown :options="useOptions" @select="handleSelect">
        <n-avatar class="mr-14px" round size="large" :src="HeadIcon" />
      </n-dropdown>
    </template>
  </qt-page-header>
</template>

<script setup lang="ts">
  import LogoIcon from '@/assets/icon/logo.svg';
  import { useGetActivedTab } from '@/hooks/useNavTabs';
  import type { OnUpdateValue } from '@quantum-asia/qt-design/es/page-header/src/types';
  import HeadIcon from '@/assets/icon/head.svg';
  import { checkout } from '@/utils/auth';

  const router = useRouter();
  const menuOptions = [
    {
      label: '租户',
      key: 'tenant',
    },
  ];
  const useOptions = [
    {
      label: '退出登录',
      key: 'logout',
    },
  ];

  const activedKey = ref('');

  watchEffect(() => {
    const activedTab = unref(useGetActivedTab());

    if (activedTab) {
      activedKey.value = activedTab!.options.key;
    }
  });

  const onUpdateValue: OnUpdateValue = key => {
    router.push({
      path: key,
    });
  };

  const handleSelect = () => {
    checkout();
  };
</script>
