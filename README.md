# MOBLAND Allow list/Free Farm raffle app

A simple tool to make a raffle for free farms and to have access to the allow list to buy farms and turfs

### Introduction

Based on https://api.mob.land/v1/snapshots/latest

- people who staked between over 50k and 250k SYNR participate in a raffle to win 60 free Farm tokens

- people who staked between 10k and 50k SYNR participate in a raffle to win 10 free Farm tokens. The non-winners will participate in a raffle to win 190 Guaranteed Whitelist Farms

#### The flow

**Stage 0**

1. This code is created.
2. The CSV file downloaded from https://api.mob.land/v1/snapshots/latest is put in this repo.
3. Commit and push to Github.

**Stage 1**

1. Chose a future block on the BNB blockchain. 
2. Include the selected block in the file `input/blockinfo.json` and update this repo.
3. Commit and push to GitHub.

**Stage 2**

1. When the selected future block is mined, include its hash in the blockinfo.json file.
2. Launch `node .` to perform the shuffle and produce the results.
3. Commit and push the update to GitHub. 

### A future block

The chosen block is [23733132](https://bscscan.com/block/countdown/23733132). Estimated Target Thu Dec 08 2022 09:00:26 GMT-0800 (Pacific Standard Time). 

When the block is mined this repo will be updated and ready to shuffle the metadata.

### The winners

When the stage 2 is completed, the results will be in the folder `result`.

### Credits

Author: [Francesco Sullo(https://github.com/sullof)

(c) 2022 Superpower Labs Inc.

### License
MIT
