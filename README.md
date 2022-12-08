# MOBLAND Allow list/Free Farm raffle app

A simple tool to make a raffle for free farms and to have access to the allow list to buy farms and turfs

### Introduction

Based on https://api.mob.land/v1/snapshots/latest

- people who staked between over 50k and 250k SYNR participate in a raffle to win 60 free Farm tokens

- people who staked between 10k and 50k SYNR participate in a raffle to win 10 free Farm tokens. The non-winners will participate in a raffle to win 190 Guaranteed Whitelist Farms

#### The flow

**Stage 1**

1. Download the CSV file downloaded from https://api.mob.land/v1/snapshots/latest
2. Save it at [input/snapshot-4th-december-2022.csv](https://github.com/superpowerlabs/allow-list-raffle/blob/main/input/snapshot-4th-december-2022.csv)
3. Chose a future block on the BNB blockchain. 
4. Include the selected block in the file `input/blockinfo.json` and update this repo.
5. Commit and push to GitHub.

**Stage 2**

1. When the selected future block is mined, include its hash in the blockinfo.json file.
2. Launch `./shuffler.js` to perform the shuffle and produce the results.
3. Commit and push the update to GitHub. 

### A future block

The chosen block is [23733132](https://bscscan.com/block/countdown/23733132). Estimated Target Thu Dec 08 2022 09:00:26 GMT-0800 (Pacific Standard Time). 

When the block is mined this repo will be updated and ready to shuffle the metadata.

### The winners

When the stage 2 is completed, the results will be in the folder `result`:
- `winners-10-free-farms.md` is the list of the winner in the 10-50k interval
- `winners-60-free-farms.md` is the list of the winner in the +50-250k interval
- `winners-190-wl-for-farms.md` is the list of the winner of a whitelist slot to but a farm

Moreover, in the same folder there will be the final lists:
- `freeFarmWinners.md` is the list of all the wallet that will receive a free Farm
- `wlFarmWinners.md is` the list of all the whitelist slots for farms (included the ones above)
- `wlTurfWinners.md is` the list of all the whitelist slots for turfs (included the ones above)

### Credits

Author: [Francesco Sullo(https://github.com/sullof)

(c) 2022 Superpower Labs Inc.

### License
MIT
