const roles = {
  'superadmin',
  'admin',
  'organisation'
}

const resources = {
  'donor': {
    'admin',
    'organisation',
    'superadmin'
  },
  'donation': {
    'admin',
    'superadmin'
  },
  'user': {
    'superadmin',
  }
}

export default {
  roles,
  resources
}

class RBAC {
  constructor(roles){
    if typeof (roles != 'object')
      throw new TypeError("Expected an object as input")
    this.roles = roles
  }

  can(role, operation) {
    return this.roles[role] && this.roles[role].can.indexOf(operation) !== -1;
  }
}
