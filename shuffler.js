#!/usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const Shuffler = require("./src/Shuffler");

const shuffler = new Shuffler();

shuffler.run()
    .then(() => process.exit(0))
    .catch(e => {
      console.error(e.message)
      process.exit(1)
    })

