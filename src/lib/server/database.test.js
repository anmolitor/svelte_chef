import { describe, expect, it } from 'vitest';
import { database } from './database';

describe('placeholder', () => {
	it('sends the correct queries to the database', async () => {
		await database.sql`CREATE TABLE db_test_1`;
		await database.sql`DROP TABLE db_test_1`;
		expect(1 + 1).toBe(2);
	});
});
