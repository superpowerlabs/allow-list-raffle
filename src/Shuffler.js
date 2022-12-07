#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const Metashu = require("@ndujalabs/metashu")

class Shuffler {

  constructor(options = {}) {
    this.options = options
    if (!options.inputPath) {
      this.options.inputPath = path.resolve(__dirname, "../input")
    }
    if (!options.resultPath) {
      this.options.resultPath = path.resolve(__dirname, "../result")
    }
  }

  async saveMdFile(title, obj, fn) {
    let arr = []
    for (let i in obj) {
      arr.push([i, obj[i]])
    }
    arr.sort((a, b) => {
      return b[1] - a[1];
    })
    let str = "# " + title + "\n```\n"
    for (let elem of arr) {
      str += elem[0] + " " + elem[1] + "\n"
    }
    str += "\n```"
    await fs.writeFile(path.resolve(this.options.resultPath, fn + ".md"), str)
  }

  async saveMdWinners(title, arr, fn) {
    let str = "# " + title + "\n\n```\n"
    str += arr.join("\n")
    str += "\n```"
    await fs.writeFile(path.resolve(this.options.resultPath, fn + ".md"), str)
  }

  async run() {
    const {hash} = JSON.parse(await fs.readFile(path.resolve(this.options.inputPath, "blockinfo.json"), "utf8"));
    const data = (await fs.readFile(path.resolve(this.options.inputPath, "snapshot-4th-december-2022.csv"), "utf8")).split("\n").map((e, index) => {
      e = e.split(",")
      if (index > 0) for (let j = 1; j < e.length; j++) {
        e[j] = parseInt(e[j])
      }
      return e;
    });

    const from10to50 = []
    const from50to250 = []
    const freeFarms = {}
    const wlForTurf = {}
    const wlForFarm = {}
    for (let i = 1; i < data.length; i++) {

      let a = data[i][0];

      if (data[i][2] > 50000 && data[i][2] <= 250000) {
        from50to250.push(a);
      } else if (data[i][2] >= 10000 && data[i][2] <= 50000) {
        from10to50.push(a);
      }

      if (data[i][4] > 0) {
        if (!freeFarms[a]) {
          freeFarms[a] = 0;
        }
        freeFarms[a] += data[i][4];
      }
      if (data[i][5] > 0) {
        if (!wlForTurf[a]) {
          wlForTurf[a] = 0;
        }
        wlForTurf[a] += data[i][5];
      }
      if (data[i][6] > 0) {
        if (!wlForFarm[a]) {
          wlForFarm[a] = 0;
        }
        wlForFarm[a] += data[i][6];
      }
    }

    await fs.ensureDir(this.options.resultPath);

    const metashu = new Metashu({});

    const raffled60Farms = []
    const raffled10Farms = []
    const raffled190Wl = []

    const first60s = metashu.getShuffling(from50to250, hash).slice(0, 60);
    for (let item of first60s) {
      let a = from50to250[item.index]
      raffled60Farms.push(a);
      if (!freeFarms[a]) {
        freeFarms[a] = 0;
      }
      freeFarms[a]++;
    }

    await this.saveMdWinners("Winners 60 free farms in +50k-250k", raffled60Farms, "winners-60-free-farms")
    await this.saveMdFile("Total free farms winners", freeFarms, "freeFarmWinners")

    const first10s = metashu.getShuffling(from10to50, hash).slice(0, 10);
    let indexes = []
    for (let item of first10s) {
      indexes.push(item.index)
      let a = from10to50[item.index]
      raffled10Farms.push(a);
      if (!freeFarms[a]) {
        freeFarms[a] = 0;
      }
      freeFarms[a]++;
    }

    await this.saveMdWinners("Winners 10 free farms in 10k-50k", raffled10Farms, "winners-10-free-farms")

    await this.saveMdFile("Whitelist turf winners", wlForTurf, "wlTurfWinners")

    for (let i of indexes) {
      from10to50.splice(i, 1)
    }

    const wlWinners = metashu.getShuffling(from10to50, hash).slice(0, 190);
    for (let item of wlWinners) {
      let a = from10to50[item.index]
      raffled190Wl.push(a);
      if (!wlForFarm[a]) {
        wlForFarm[a] = 0;
      }
      wlForFarm[a]++;
    }

    await this.saveMdWinners("Winners 190 wl for farms", raffled190Wl, "winners-190-wl-for-farms")
    await this.saveMdFile("Total whitelist farm winners", wlForFarm, "wlFarmWinners")

    if (!this.options.noConsole) {
      console.log("All done! Data saved in ", this.options.resultPath)
    }
  }
}

module.exports = Shuffler;
