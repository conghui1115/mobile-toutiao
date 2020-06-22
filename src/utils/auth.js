/**
 * auth.js专门处理token 的读写和删除
 *
 */
const USER_TOKEN = 'mobile-toutiao' // 专门用来存储用户信息
// 设置用户的token 信息
export function setUser (user) {
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))// 对象需要转化为字符串
}

// 获取用户的token 信息
export function getUser () {
  // 短路表达式 ||
  // 如果前面为true 则后面不执行 前面为false 后面才执行  得到的是一个
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}')
}

// 删除token 信息
export function delUser () {
  window.localStorage.removeItem(USER_TOKEN)
}
