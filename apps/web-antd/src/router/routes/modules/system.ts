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
          icon: 'lucide:area-chart',
          title: '权限管理',
        },
      },
      {
        name: 'Role',
        path: '/role',
        component: () => import('#/views/System/Role/list.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '角色管理',
        },
      },
      {
        name: 'User',
        path: '/user',
        component: () => import('#/views/System/User/list.vue'),
        meta: {
          icon: 'carbon:workspace',
          title: '用户管理',
        },
      },
    ],
  },
];

export default routes;
