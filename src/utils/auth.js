import Cookies from 'js-cookie'

const Token_Key = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(Token_Key)
}

export function setToken(token) {
  return Cookies.set(Token_Key, token)
}

export function removeToken() {
  return Cookies.remove(Token_Key)
}

