#! /usr/bin/env node
'use strict';

const readline = require('readline');
const AWS = require('aws-sdk');

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

read.on('line', (input) => {
  const destination = process.argv[2];
  const payload = JSON.parse(input);

  const { params, source } = payload;
  const {
    aws_access_key: accessKeyId,
    aws_secret_access_key: secretAccessKey,
    aws_region: region,
    rds_instance_identifier: rdsIdentifier,
  } = source;

  if (!accessKeyId) {
    console.error('[source.aws_access_key]: not.configured');
    process.exit(1);
  }
  if (!secretAccessKey) {
    console.error('[source.aws_secret_access_key]: not.configured');
    process.exit(1);
  }
  if (!region) {
    console.error('[source.aws_region]: not.configured');
    process.exit(1);
  }
  if (!rdsIdentifier) {
    console.error('[source.rds_instance_identifier]: not.configured');
    process.exit(1);
  }

  const options = {
    params: {},
    region,
    apiVersion: '2014-10-31',
    accessKeyId,
    secretAccessKey,
  };

  const rds = new AWS.RDS(options);

  const createParams = {
    DBInstanceIdentifier: rdsIdentifier,
    DBSnapshotIdentifier: '',
    Tags: [
      {
        Key: '',
        Value: '',
      },
    ],
  };

  rds.createDBSnapshot(createParams, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const { DBSnapshot } = data;
    const {
      SnapshotCreateTime,
      Status,
    } = DBSnapshot;

    const waitParams = {
      DBInstanceIdentifier: '',
      DBSnapshotIdentifier: '',
      SnapshotType: 'manual',
    };

    rds.waitFor('dbSnapshotAvailable', waitParams, (waitErr, waitData) => {
      if (waitErr) {
        console.error(waitErr);
        process.exit(1);
      }

    });
  });
});

read.on('close', () => {
  console.log('got.close.event');
  // INFO(mperrotte): this console log is the necessary inplementation of the CHECK API
  console.log(JSON.stringify([]));
  process.exit(0);
});
