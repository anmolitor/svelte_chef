import { POSTGRES_URL } from '$env/static/private';
import { createPool } from '@vercel/postgres';

export let database = createPool({ connectionString: POSTGRES_URL });
