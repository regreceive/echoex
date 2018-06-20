const _ = require('lodash');
const Web3 = require('web3');
const fs = require('fs');
const Config = require('./src/config');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const DataType = Sequelize.DataTypes;

const { db, user, pass, host, port } = Config.database;
const sequelize = new Sequelize(db, user, pass, {
  host,
  port,
  operatorsAliases: Op,
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  // disable logging; default: console.log
  logging: false,
});
const UserRaised = sequelize.define('UserRaised', {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataType.INTEGER,
    defaultValue: null,
  },

  address: {
    type: DataType.CHAR(42),
  },

  block_number: {
    type: DataType.INTEGER.UNSIGNED,
  },

  block_hash: {
    type: DataType.CHAR(66),
  },

  transaction_hash: {
    type: DataType.CHAR(66),
    unique: true,
  },

  amount: {
    type: DataType.DECIMAL(30, 18),
  },

  status: {
    type: DataType.TINYINT,
    defaultValue: 0,
  },
});

function getDate(date = new Date()) {
  const yyyy = date.getUTCFullYear().toString();
  const mm = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
  const dd = date.getUTCDate().toString().padStart(2, '0');
  const HH = date.getHours().toString().padStart(2, '0');
  const MM = date.getMinutes().toString().padStart(2, '0');
  let SS = date.getMilliseconds().toString().padStart(2, '0');
  SS = SS.padEnd(3,"0");

  let year = yyyy;
  let month = mm.padStart(2, '0');
  let day = dd.padStart(2, '0');
  let hour = HH.padStart(2, '0');
  let minute = MM.padStart(2, '0');
  let second = SS.padStart(3, '0');
  return `${year}-${month}-${day}|${hour}:${minute}:${second}Z`;
}

const log = function info(...args) {
  args.unshift(getDate());
  args.unshift(`[Info]`);
  console.log(...args); // eslint-disable-line no-console
  return true;
};

function Blockchain() {}

Blockchain.prototype.Init = function() {
  this.lastBlk = Config.Blockchain.startBlk || 0;
  this.endBlk = Config.Blockchain.endBlk || 'latest';
  this.bulk = [];
  this.exitOnEnd = true;

  if (!_.isNumber(this.lastBlk)) {
    throw new Error(`lastBlk must be integer,current ${this.lastBlk}`);
  }
  if (!_.isNumber(this.endBlk) && this.endBlk !== 'latest') {
    throw new Error(
      `endBlk must either be integer nor "latest",current ${this.endBlk}`,
    );
  }
};

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
Blockchain.prototype.Run = async function() {
  if (this.endBlk === 'latest') {
    this.exitOnEnd = false;
  }

  if (!this.lastBlk) {
    this.lastBlk = await this.readLastBlkFromLockFile();
    log(this.lastBlk);
  }

  while (true) {
    await wait(10 * 1000);
    await this.task();
  }
};

Blockchain.prototype.task = async function() {
  if (!this.exitOnEnd) {
    this.endBlk = await web3.eth.getBlockNumber();
    if(!this.lastBlk) this.lastBlk = this.endBlk - 12;
    log(`latest blk#${this.endBlk}`);
  }
  if (this.lastBlk < this.endBlk) {
    await this.digBlock();
  }
};

Blockchain.prototype.digBlock = async function() {
  this.bulk = [];
  for (let i = this.lastBlk+1; i <= this.endBlk; i++) {
    this.lastBlk = i;
    const block = await web3.eth.getBlock(i, true);
    const block_number = block.number;
    const block_hash = block.hash;
    for (let j = 0; j < block.transactions.length; j++) {
      const tx = block.transactions[j];
      if (tx.to === Config.Blockchain.targetAddress) {
        const txReceipt = await web3.eth.getTransactionReceipt(tx.hash);
        this.bulk.push({
          address: tx.from,
          block_number,
          block_hash,
          transaction_hash: tx.hash,
          amount: web3.utils.fromWei(tx.value),
          status: txReceipt.status ? 1 : 0,
        });
      }
    }
    await this.bulkInsert();
    await this.updateUserId();
    await this.writeLastBlk();
    log(
      `handle #blk${this.lastBlk}, txs:${
        block.transactions.length
      }, processed:${this.bulk.length}`,
    );
    this.bulk = [];
  }

  if (this.exitOnEnd) {
    log(`work done!`);
    process.exit(1);
  }
};

Blockchain.prototype.readLastBlkFromLockFile = async function() {
  const filename = Config.Blockchain.lastBlkLock;
  log(`read from lock file:${filename}`);
  if (!fs.existsSync(filename)) return 0;
  let data = fs.readFileSync(filename);
  data = parseInt(data, 10) || 0;
  if (_.isNaN(data) || !data) return 0;
  return data;
};
Blockchain.prototype.writeLastBlk = async function(){
  const filename = Config.Blockchain.lastBlkLock;
  fs.writeFileSync(filename, this.lastBlk);
};

Blockchain.prototype.bulkInsert = async function() {
  if (this.bulk.length) {
    return UserRaised.bulkCreate(this.bulk, { ignoreDuplicates: true });
  }
};

Blockchain.prototype.updateUserId = async function() {
  return sequelize.query(
    'UPDATE `UserRaised` as t,`User` as c SET userId = c.`id` WHERE c.`address` = t.`address`',
  );
};

// start listening on new transaction
const web3 = new Web3(
  new Web3.providers.WebsocketProvider(Config.Blockchain.url, {
    timeout: 1000,
  }),
);
const blockchain = new Blockchain();
blockchain.Init();
blockchain.Run().catch(err => {
  log(err);
});
