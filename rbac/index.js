let roles = {
  sadmin: {
    allowed: ['user', 'donor', 'donation']
  },
  admin: {
    allowed: ['donor' , 'donation']
  },
  organisation:{
    allowed: ['donor']
  }
}

function can(role, resource){
  return this.roles[role] && this.roles[role].allowed.indexOf(resource) !== -1;
}

module.exports = {
  roles,
  can
}
