import API from '@/api/user.js'

//审批工作流人员/组织选择器配置

export default {
  //配置接口正常返回代码
  successCode: 200,
  //配置组织
  group: {
    //请求接口对象
    apiObj: API.userOrgTreeSelector,
    //接受数据字段映射
    parseData: function (res) {
      return {
        rows: res.data,
        msg: res.msg,
        code: res.code
      }
    },
    //显示数据字段映射
    props: {
      key: 'id',
      label: 'label',
      children: 'children'
    }
  },
  //配置用户
  user: {
    apiObj: API.userSelector,
    pageSize: 20,
    parseData: function (res) {
      return {
        rows: res.data.rows,
        total: res.data.total,
        msg: res.msg,
        code: res.code
      }
    },
    props: {
      key: 'id',
      label: 'user'
    },
    request: {
      page: 'page',
      pageSize: 'pageSize',
      groupId: 'groupId',
      keyword: 'keyword'
    }
  },
  //配置角色
  role: {
    //请求接口对象
    apiObj: API.userRoleSelector,
    //接受数据字段映射
    parseData: function (res) {
      return {
        rows: res.data,
        msg: res.msg,
        code: res.code
      }
    },
    //显示数据字段映射
    props: {
      key: 'id',
      label: 'label',
      children: 'children'
    }
  }
}
