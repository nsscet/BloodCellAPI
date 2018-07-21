let roles = {
  sadmin: {
    allowed: ['user', 'donor', 'donation', 'organisation', 'requirement']
  },
  admin: {
    allowed: ['donor', 'donation', 'requirement']
  },
  organisation: {
    allowed: ['donor', 'organisation']
  }
}

function can (role, resource) {
  return this.roles[role] && this.roles[role].allowed.indexOf(resource) !== -1
}

module.exports = {
  roles,
  can
}
