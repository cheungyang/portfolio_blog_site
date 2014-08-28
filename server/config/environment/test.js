'use strict';

// Test specific configuration
// ==================================
module.exports = {
  dataSource: {
    mysql: {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'blogalvacheungcom',
      port: 8889
    },

    fs: {
      folder: '../datasources/fs'
    },

    default: 'fs'
  }
};
