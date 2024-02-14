import { env } from '$env/dynamic/private';
import pg from 'pg';

const client = new pg.Client(env.POSTGRES_URL);

/** @type {(() => void)[]} */
let connectionSubscribers = [];
let connected = false;
let connecting = false;

/**
 * 
 * @returns {Promise<void>}
 */
const connect = async () => {
  if (connected) {
    return;
  }
  if (!connecting) {
    return client.connect(() => {
      connected = true;
      connecting = false;
      connectionSubscribers.forEach((sub) => sub());
      connectionSubscribers = [];
    });
  }
  return new Promise(resolve => {
    connectionSubscribers.push(resolve);
  })
}

/**
 * 
 * @param {TemplateStringsArray} textFragments 
 * @param  {Value[]} valueFragments
 * @returns {Promise<import('pg').QueryResult>} 
 */
export const sql = async(textFragments, ...valueFragments) => {
  await connect();

  /** @type {Query} */
  const query = {
    text: textFragments[0],
    values: []
  };
  valueFragments.forEach((valueFragment, i) => {
    const q = values([valueFragment])(query.values.length);
    query.text += q.text + textFragments[i + 1];
    query.values = query.values.concat(q.values);
  });

  return client.query(query.text, query.values)
}

/**
 * @typedef {Object} Query
 * @property {string} text
 * @property {Value[]} values
 */

/**
 * @typedef {string | number} Value
 */

/**
 * 
 * @param {Value[]} values 
 * @returns {(index: number) => Query }
 */
function values(values) {
  return valuePosition => ({
    text: Array.from({ length: values.length }).map(() => '$' + (++valuePosition)).join(', '),
    values
  })
};
