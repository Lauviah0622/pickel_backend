require('dotenv').config();

module.exports = {
  "development": {
    "use_env_variable": "DB_DEV",
    "charset": 'utf8',
    "collate": 'utf8_general_ci', 
  },
  "test": {
    "use_env_variable": "DB_TEST"
  },
  "production": {
    "use_env_variable": "DB_PROD"
  }
}
