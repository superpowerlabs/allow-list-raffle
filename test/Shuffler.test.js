const { expect } = require("chai");
const path = require("path");
const fs = require("fs-extra");

const Shuffler = require("../src/Shuffler");

describe("Shuffler", async function () {

  let resultPath = path.resolve(__dirname, "../tmp/result");

  beforeEach(async function() {
    await fs.emptyDir(resultPath);
  })

  after(async function() {
    await fs.emptyDir(resultPath);
  })

  it("should shuffle the data and verify that it is correct", async function () {
    let options = {
      inputPath: path.resolve(__dirname, "fixtures/input"),
      resultPath,
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

    const winnerList = await fs.readFile(resultPath + "/winners-10-free-farms.md", "utf8")

    for (let address of expectedWinners) {
      expect(RegExp(address).test(winnerList)).equal(true)
    }

  });

  it("should shuffle the data and verify that it is correct", async function () {

    let options = {
      inputPath: path.resolve(__dirname, "fixtures/input2"),
      resultPath,
      noConsole: true
    }
    let shuffler = new Shuffler(options);
    await shuffler.run();

    const expectedWinners = `0xD77E06Fe0dB40eD225F42aD9036c7eDaE754e019
0x64237C939B669911B34f6c73abE22b3e723bAb15
0x1Fa4823613Fb2424cbDab225FC1eEfe3Bd293c84
0xC733fE37374d29e1B354706551902Cc7aEDF1234
0xa44Fa12ACEb5b03061321D49A6b1Deee5Bdf2bfF
0x07aFF14a7A8F51882B3495409D607EC0511f6152
0xcb6cCc00464119bA0f3BaBdf0AAB9E54A86546CA
0xDAF8ab12cB9495398D211479C346DE2d63125e07
0x078d179e25ebe7a930f8EFB863141236E9ff508b
0x1EED8a21Ac0456a4d290717aCaC8B1cb43a1cfef`.split("\n")

    const winnerList = await fs.readFile(resultPath + "/winners-10-free-farms.md", "utf8")

    for (let address of expectedWinners) {
      expect(RegExp(address).test(winnerList)).equal(true)
    }

  });
});
