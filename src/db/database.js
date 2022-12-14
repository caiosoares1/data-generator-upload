import { Database } from 'sqlite-async';
import { resolve } from 'path';

const dbFile = resolve(process.cwd(), 'src',  'db', 'db.sqlite');

async function connect() {
  return await Database.open(dbFile);
};

export default { connect };