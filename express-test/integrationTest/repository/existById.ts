import test from 'ava'

import { existById } from '../../src/repository/existById'
import { Client } from 'pg';

const client = new Client({
  user: 'express',
  password: 'express',
  host: 'localhost',
  database: 'express'
})

test.before('Populate database', async () => {
  await client.connect()
    .then(() => { client.query('CREATE TABLE IF NOT EXISTS items (id numeric PRIMARY KEY);'); })
    .then(() => { client.query(`INSERT INTO items VALUES (1);`); });
})

test.after('Disconnect client', async () => {
  await client.end()
})

test('Should find item', async (t) => {
  const exist = await existById(1, client);
  t.assert(exist);
})

