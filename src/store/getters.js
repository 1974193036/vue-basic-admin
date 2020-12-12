const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes
}

export default getters
