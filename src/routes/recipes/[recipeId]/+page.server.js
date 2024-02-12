import { database } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

/** @type {import('../$types').PageServerLoad} */
export async function load({ params }) {
	/**
	 * @type {import('@vercel/postgres').QueryResult<RecipeDetails>}
	 */
	const queryResult =
		await database.sql`SELECT id, title, description FROM recipe WHERE id = ${params.recipeId}`;
	const [recipe] = queryResult.rows;
	if (!recipe) {
		fail(404, { recipe: 'Not found' });
	}
	return {
		recipe
	};
}
