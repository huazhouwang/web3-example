/**
 * https://www.trufflesuite.com/docs/truffle/reference/configuration
 */

module.exports = {
  networks: {},

  // Configure your compilers
  compilers: {
    solc: {
      version: '0.8.3',
      docker: true,
      settings: {
        optimizer: {
          enabled: false,
          runs: 200,
        },
        evmVersion: 'istanbul',
      },
    },
  },
  db: {
    enabled: false,
  },
};
