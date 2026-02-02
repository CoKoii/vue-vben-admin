import { requestClient } from '#/api/request';

/**
 * 获取用户列表
 */
export async function getAllUsers(params: any) {
  return requestClient.get('/user', {
    params,
  });
}
/**
 * 获取角色列表
 */
export async function getAllRoles(params: any) {
  return requestClient.get('/role', {
    params,
  });
}
