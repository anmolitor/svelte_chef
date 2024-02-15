import { database } from '$lib/server/database';
import { error } from '@sveltejs/kit';

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
		await database.sql`SELECT id, title, description FROM recipe WHERE id = ${params.recipeId}`;
	const [recipe] = queryResult.rows;
	if (!recipe) {
		console.log('Throw error');
		error(404, { message: 'Recipe not found' });
	}
	console.log('???');
	return {
		recipe
	};
}
