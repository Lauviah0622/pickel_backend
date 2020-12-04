require('dotenv').config()

module.exports = {
  "development": {
    "use_env_variable": 'DB_DEV'
  },
  "test": {
    "use_env_variable": 'DB_TEST'
  },
  "production": {
    "use_env_variable": 'DB_PROD'
  }
}
