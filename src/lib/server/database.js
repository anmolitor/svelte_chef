import { env } from '$env/dynamic/private';
import pg from 'pg';
import { ConnectionPool } from './database/pool';

const pool = new pg.Pool({
	connectionString: env.POSTGRES_URL
});

export const database = new ConnectionPool(pool);
