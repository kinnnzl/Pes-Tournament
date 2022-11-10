module.exports = {
    HOST: "localhost",
    PORT: "1435",
    USER: "test",
    PASSWORD: "test123",
    DB: "Test",
    dialect: "mssql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };