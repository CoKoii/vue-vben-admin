import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: '系统管理',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'Permission',
        path: '/permission',
        component: () => import('#/views/System/Permission/list.vue'),
        meta: {
          icon: 'icon-park-outline:permissions',
          title: '权限码管理',
        },
      },
      {
        name: 'Role',
        path: '/role',
        component: () => import('#/views/System/Role/list.vue'),
        meta: {
          icon: 'eos-icons:role-binding',
          title: '角色管理',
        },
      },
      {
        name: 'User',
        path: '/user',
        component: () => import('#/views/System/User/list.vue'),
        meta: {
          icon: 'ri:user-3-line',
          title: '用户管理',
        },
      },
    ],
  },
];

export default routes;
