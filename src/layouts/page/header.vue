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
      children: [
        {
          label: '租户管理',
          key: 'multiTenant',
        },
        {
          label: '使用情况',
          key: 'usage',
        },
        {
          label: '数据库账户',
          key: 'dbAccount',
        },
      ],
    },
    {
      label: '用户管理',
      key: 'users',
    },
    {
      label: '试用管理',
      key: 'accessControl',
    },
    {
      label: '设置',
      key: 'setUp',
      children: [
        {
          label: '系统设置',
          key: 'systemSetup',
        },
      ],
    },
    {
      label: 'APP',
      key: 'APP',
      children: [
        {
          label: '系统版本',
          key: 'systemInfo',
        },
        {
          label: '扩展版本',
          key: 'exSysInfo',
        },
      ],
    },
    // {
    //   label: 'WebWork设置',
    //   key: 'setWebwork',
    // },
    {
      label: '自定义',
      key: 'customize',
      children: [
        {
          label: '租户自定义',
          key: 'customTenant',
        },
      ],
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
