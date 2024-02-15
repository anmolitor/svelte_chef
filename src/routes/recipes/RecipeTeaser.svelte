<script>
	/**
	 * @type {RecipeTeaser}
	 */
	export let recipe;
</script>

<div>
	<a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
</div>
