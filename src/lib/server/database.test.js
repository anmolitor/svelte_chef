import pg from 'pg';
import { describe, expect, it } from 'vitest';
import { ConnectionPool } from './database/pool';

const database = new ConnectionPool(
	new pg.Pool({
		connectionString: process.env.POSTGRES_URL ?? 'postgres://postgres:postgres@localhost:5432',
		max: 2
	})
);

describe('placeholder', () => {
	it('sends the correct queries to the database', async () => {
		await database.sql`CREATE TABLE db_test_1 (id INT PRIMARY KEY)`;
		try {
			await database.sql`INSERT INTO db_test_1 (id) VALUES (1)`;
			const queryResult = await database.sql`SELECT id FROM db_test_1`;
			expect(queryResult.rows).toEqual([{ id: 1 }]);
		} finally {
			await database.sql`DROP TABLE db_test_1`;
		}
	});

	it('prevents sql injection', async () => {
		await database.sql`CREATE TABLE db_test_2 (id INT PRIMARY KEY)`;
		try {
			try {
				await database.sql`INSERT INTO db_test_2 (id) VALUES (${'1);DROP TABLE db_test_2;'})`;
			} catch {
				// expected to error since value should be an integer but was a string
			}
			const queryResult = await database.sql`SELECT id FROM db_test_2`;
			// table was not dropped!
			expect(queryResult.rows).toEqual([]);
		} finally {
			await database.sql`DROP TABLE db_test_2`;
		}
	});

	it('does not execute a transaction by default', async () => {
		await database.sql`CREATE TABLE db_test_3 (id INT PRIMARY KEY)`;
		const multipleQueries = async () => {
			await database.sql`INSERT INTO db_test_3 (id) VALUES (2)`;
			// intended to fail
			await database.sql`INSERT INTO db_test_3 (id) VALUES ('1')`;
		};
		try {
			multipleQueries();
		} catch (e) {
			const queryResult = await database.sql`SELECT id FROM db_test_2`;
			// INSERT was not rolled back
			expect(queryResult.rows).toBe([{ id: 2 }]);
		} finally {
			await database.sql`DROP TABLE db_test_3`;
		}
	});

	it('can execute a transaction using the transaction api', async () => {
		await database.sql`CREATE TABLE db_test_4 (id INT PRIMARY KEY)`;
		/** @param {import('./database/pool').Transaction} transaction */
		const multipleQueries = async (transaction) => {
			console.log('Running in tx');
			await transaction.sql`INSERT INTO db_test_4 (id) VALUES (2)`;
			// intended to fail
			await transaction.sql`INSERT INTO db_test_4 (id) VALUES ('1')`;
		};
		try {
			try {
				await database.withTransaction(multipleQueries);
			} catch (e) {
				const queryResult = await database.sql`SELECT id FROM db_test_4`;
				// INSERT **was** rolled back
				expect(queryResult.rows).toBe([]);
			}
		} finally {
			await database.sql`DROP TABLE db_test_4`;
		}
	});
});
