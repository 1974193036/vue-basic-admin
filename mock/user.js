
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    menuList: [
      {
        'create_time': '2018-03-16 11:33:00',
        'menu_type': 'M',
        'parent_id': 0,
        'menu_name': '人员管理',
        'icon': 'people',
        'perms': null,
        'order_num': 2,
        'menu_id': 1,
        'url': '/people',
        'children': [
          {
            'create_time': '2018-03-16 11:33:00',
            'menu_type': 'C',
            'parent_id': 1,
            'menu_name': '用户',
            'icon': 'peoples',
            'perms': 'system:user:index',
            'order_num': 1,
            'menu_id': 4,
            'url': 'user',
            'children': []
          }
          // {
          //   'create_time': '2018-03-16 11:33:00',
          //   'menu_type': 'C',
          //   'parent_id': 1,
          //   'menu_name': '用户管理',
          //   'icon': '#',
          //   'perms': 'system:user:index',
          //   'order_num': 1,
          //   'menu_id': 4,
          //   'url': 'user',
          //   'children': []
          // }
          // {
          //   'create_time': '2018-12-28 10:36:20',
          //   'menu_type': 'M',
          //   'parent_id': 1,
          //   'menu_name': '通讯录管理',
          //   'icon': 'fa fa-address-book-o',
          //   'perms': null,
          //   'order_num': 1,
          //   'menu_id': 73,
          //   'url': '/report',
          //   'children': [
          //     {
          //       'create_time': '2018-12-28 10:50:28',
          //       'menu_type': 'C',
          //       'parent_id': 73,
          //       'menu_name': '人员通讯录',
          //       'icon': null,
          //       'perms': 'system:person:index',
          //       'order_num': 1,
          //       'menu_id': 74,
          //       'url': 'person'
          //     },
          //     {
          //       'create_time': '2018-12-28 10:50:28',
          //       'menu_type': 'C',
          //       'parent_id': 73,
          //       'menu_name': '人员通讯录2',
          //       'icon': null,
          //       'perms': 'system:person:index',
          //       'order_num': 1,
          //       'menu_id': 75,
          //       'url': 'person2'
          //     }
          //   ]
          // }
        ]
      },
      {
        'create_time': '2018-03-16 11:33:00',
        'menu_type': 'M',
        'parent_id': 0,
        'menu_name': '系统监控',
        'icon': 'el-icon-success',
        'perms': null,
        'order_num': 5,
        'menu_id': 2,
        'url': '/system',
        'children': [
          {
            'create_time': '2018-03-16 11:33:00',
            'menu_type': 'C',
            'parent_id': 2,
            'menu_name': '数据监控',
            'icon': 'el-icon-search',
            'perms': 'monitor:data:view',
            'order_num': 3,
            'menu_id': 15,
            'url': 'monitor'
          },
          {
            'create_time': '2018-03-16 11:33:00',
            'menu_type': 'C',
            'parent_id': 2,
            'menu_name': '数据监控2',
            'icon': 'el-icon-search',
            'perms': 'monitor:data:view',
            'order_num': 3,
            'menu_id': 16,
            'url': 'monitor2'
          }
        ]
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    menuList: [
      {
        'create_time': '2018-03-16 11:33:00',
        'menu_type': 'M',
        'parent_id': 0,
        'menu_name': '系统监控',
        'icon': 'el-icon-success',
        'perms': null,
        'order_num': 5,
        'menu_id': 2,
        'url': '/system',
        'children': [
          {
            'create_time': '2018-03-16 11:33:00',
            'menu_type': 'C',
            'parent_id': 2,
            'menu_name': '数据监控',
            'icon': 'el-icon-search',
            'perms': 'monitor:data:view',
            'order_num': 3,
            'menu_id': 15,
            'url': 'monitor'
          },
          {
            'create_time': '2018-03-16 11:33:00',
            'menu_type': 'C',
            'parent_id': 2,
            'menu_name': '数据监控2',
            'icon': 'el-icon-search',
            'perms': 'monitor:data:view',
            'order_num': 3,
            'menu_id': 16,
            'url': 'monitor2'
          }
        ]
      }
    ]
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
