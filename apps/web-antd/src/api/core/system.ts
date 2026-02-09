import { requestClient } from '#/api/request';

/**
 * 获取用户列表
 */
export async function getAllUsers(params: any) {
  return requestClient.get('/users', {
    params,
  });
}
/**
 * 获取角色列表
 */
export async function getAllRoles(params: any) {
  return requestClient.get(`/roles`, {
    params,
  });
}

/**
 * 创建角色
 */
export async function createRole(data: any) {
  return requestClient.post('/roles', data);
}

/**
 * 更新角色
 */
export async function updateRole(id: number, data: any) {
  return requestClient.put(`/roles/${id}`, data);
}

/**
 * 创建权限码
 */
export async function createPermission(data: any) {
  return requestClient.post('/permissions', data);
}

/**
 * 获取权限码列表
 */
export async function getAllPermissions(params: any) {
  return requestClient.get('/permissions', {
    params,
  });
}
/**
 * 更新权限码
 */
export async function updatePermission(id: number, data: any) {
  return requestClient.put(`/permissions/${id}`, data);
}
