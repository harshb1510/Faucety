require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    shm: {
      url: "https://hackathon.shardeum.org/",
      accounts: [
        "b48a1c3a4cffe7dd7ac36742811ded621212416d3cad6e3255b0b348353bc9c1",
      ],
      gas: 20000000,
    },
  },
};
