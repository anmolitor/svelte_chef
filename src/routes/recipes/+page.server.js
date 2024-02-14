import { sql } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
	/**
	 * @type {import('pg').QueryResult<RecipeTeaser>}
	 */
	const queryResult = await sql`SELECT id, title FROM recipe`;
	const recipes = queryResult.rows;
	return {
		recipes
	};
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const title = form.get('title');
		const description = form.get('description');

		if (!title || !description) {
			return fail(400, {});
		}

		await sql`INSERT INTO recipe (title, description) VALUES (${title.toString()}, ${description.toString()})`;
	}
};
