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
  return requestClient.get(`/role`, {
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
 * 创建权限码
 */
export async function createPermission(data: any) {
  return requestClient.post('/permission', data);
}

/**
 * 获取权限码列表
 */
export async function getAllPermissions(params: any) {
  return requestClient.get('/permission', {
    params,
  });
}
/**
 * 更新权限码
 */
export async function updatePermission(id: number, data: any) {
  return requestClient.put(`/permission/${id}`, data);
}
