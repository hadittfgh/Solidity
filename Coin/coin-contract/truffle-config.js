module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777",
      gas: 4600000
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};