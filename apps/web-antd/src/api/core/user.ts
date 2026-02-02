import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/profile');
}

/**
 * 修改用户信息
 */
export async function updateUserApi(id: number, data: any) {
  return requestClient.put(`/user/${id}`, data);
}

/**
 * 删除用户
 */
export async function deleteUserApi(id: number) {
  return requestClient.delete(`/user/${id}`);
}
