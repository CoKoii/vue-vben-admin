import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/profiles/me');
}

/**
 * 修改用户信息
 */
export async function updateUserApi(id: number, data: any) {
  return requestClient.put(`/users/${id}`, data);
}

/**
 * 删除用户
 */
export async function deleteUserApi(id: number) {
  return requestClient.delete(`/users/${id}`);
}
