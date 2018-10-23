#! /usr/bin/env node
'use strict';

const readline = require('readline');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.on('line', (input) => {
});

read.on('close', () => {
  // INFO(mperrotte): this console log is the necessary inplementation of the CHECK API
  console.log(JSON.stringify([]));
  process.exit(0);
});
