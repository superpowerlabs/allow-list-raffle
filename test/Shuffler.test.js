const { expect } = require("chai");
const path = require("path");
const fs = require("fs-extra");

const Shuffler = require("../src/Shuffler");

describe("Shuffler", async function () {

  beforeEach(async function() {
    await fs.emptyDir(options.resultPath);
  })

  it("should shuffle the data and verify that it is correct", async function () {
    let options = {
      inputPath: path.resolve(__dirname, "fixtures/input"),
      resultPath: path.resolve(__dirname, "../tmp/result"),
      noConsole: true
    }
    let shuffler = new Shuffler(options);
    await shuffler.run()

    const expectedWinners = `0x30Fe233a3ed16f468255F8c8c383C218D0e5eA5E
0x5CebfE8a127edB9746F9D6E0368C784273A0059b
0x223F073524ce324011f2EdE55e6d10E6cc3f98b4
0x94F76A10B64a7b324C0Af6412C37dF2aC4d25177
0xA80209B06d7F4c0028b3A3AAE4011357b7eaF752
0xb35a5ff901765Bb037051F6138Cb038ad5327AeE
0x5BE916f99eA3FF4207769Cd42D325167e955540b
0x69f50CD05a887124A8D1EE0f5ac7561469627D0E
0xbE955eacbcC207a72F1747AC0A6F93a30031d42E
0x56a7a1514aC135a71639f6453a007Dd9C52d5B59`.split("\n")

    const winnerList = await fs.readFile(options.resultPath + "/winners-10-free-farms.md", "utf8")

    for (let address of expectedWinners) {
      expect(RegExp(address).test(winnerList)).equal(true)
    }

  });

  it("should shuffle the data and verify that it is correct", async function () {

    let options = {
      inputPath: path.resolve(__dirname, "fixtures/input2"),
      resultPath: path.resolve(__dirname, "../tmp/result"),
      noConsole: true
    }
    let shuffler = new Shuffler(options);

    const expectedWinners = `0x30Fe233a3ed16f468255F8c8c383C218D0e5eA5E
0x5CebfE8a127edB9746F9D6E0368C784273A0059b
0x223F073524ce324011f2EdE55e6d10E6cc3f98b4
0x94F76A10B64a7b324C0Af6412C37dF2aC4d25177
0xA80209B06d7F4c0028b3A3AAE4011357b7eaF752
0xb35a5ff901765Bb037051F6138Cb038ad5327AeE
0x5BE916f99eA3FF4207769Cd42D325167e955540b
0x69f50CD05a887124A8D1EE0f5ac7561469627D0E
0xbE955eacbcC207a72F1747AC0A6F93a30031d42E
0x56a7a1514aC135a71639f6453a007Dd9C52d5B59`.split("\n")

    const winnerList = await fs.readFile(options.resultPath + "/winners-10-free-farms.md", "utf8")

    for (let address of expectedWinners) {
      expect(RegExp(address).test(winnerList)).equal(true)
    }

  });
});
