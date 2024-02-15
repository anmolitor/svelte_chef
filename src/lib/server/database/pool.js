import { templateSqlQuery } from './template';

export class ConnectionPool {
	/**
	 * @param {import('pg').Pool} pool
	 */
	constructor(pool) {
		this.pool = pool;
	}

	/**
	 * @param {TemplateStringsArray} textFragments
	 * @param  {Value[]} valueFragments
	 * @returns {Promise<import('pg').QueryResult>}
	 */
	sql(textFragments, ...valueFragments) {
		const { text, values } = templateSqlQuery(textFragments, ...valueFragments);
		return this.pool.query(text, values);
	}

	/**
	 * @template T The final result of your queries inside of the transaction.
	 * @param {(transaction: Transaction) => Promise<T>} callback
	 *    Use the provided transaction object to run queries inside of the transaction.
	 *    If any query fails, the whole transaction is rolled back.
	 * @returns {Promise<T>}
	 */
	async withTransaction(callback) {
		const client = await this.pool.connect();

		try {
			await client.query('BEGIN');
		} catch (e) {
			console.error('Failed to start transaction.', e);
			client.release();
			throw e;
		}

		try {
			const result = await callback(new Transaction(client));
			await client.query('COMMIT');
			return result;
		} catch (e) {
			console.error('Caught error within transaction, rolling back');
			await client.query('ROLLBACK');
			throw e;
		} finally {
			client.release();
		}
	}
}

class Transaction {
	/**
	 * @param {import('pg').PoolClient} client
	 */
	constructor(client) {
		this.client = client;
	}

	/**
	 * @param {TemplateStringsArray} textFragments
	 * @param  {Value[]} valueFragments
	 * @returns {Promise<import('pg').QueryResult>}
	 */
	sql(textFragments, ...valueFragments) {
		const { text, values } = templateSqlQuery(textFragments, ...valueFragments);
		return this.client.query(text, values);
	}
}
