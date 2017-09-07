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
