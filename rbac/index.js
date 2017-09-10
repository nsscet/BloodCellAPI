let roles = {
  sadmin: {
    allowed: ['user', 'donor', 'donation', 'organisation']
  },
  admin: {
    allowed: ['donor' , 'donation']
  },
  organisation:{
    allowed: ['donor','organisation']
  }
}

function can(role, resource){
  return this.roles[role] && this.roles[role].allowed.indexOf(resource) !== -1;
}

module.exports = {
  roles,
  can
}
