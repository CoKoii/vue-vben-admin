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

/**
 * 创建角色
 */
export async function createRole(data: any) {
  return requestClient.post('/role', data);
}

/**
 * 更新角色
 */
export async function updateRole(id: number, data: any) {
  return requestClient.put(`/role/${id}`, data);
}

/**
 * 删除角色
 */
export async function deleteRole(id: number) {
  return requestClient.delete(`/role/${id}`);
}
