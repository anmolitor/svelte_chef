import { sql } from '$lib/server/database';
import { fail } from '@sveltejs/kit';

/**
 * @typedef {Object} Params
 * @property {String} recipeId - The ID of the recipe
 */
/**
 * @typedef {Object} PageData
 * @property {Params} params - Path Parameters from the URL
 */
/**
 * @type {import('../$types').PageServerLoad}
 * @param {PageData} data
 */
export async function load({ params }) {
	/**
	 * @type {import('pg').QueryResult<RecipeDetails>}
	 */
	const queryResult =
		await sql`SELECT id, title, description FROM recipe WHERE id = ${params.recipeId}`;
	const [recipe] = queryResult.rows;
	if (!recipe) {
		fail(404, { recipe: 'Not found' });
	}
	return {
		recipe
	};
}
