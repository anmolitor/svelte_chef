<script>
	import RecipeForm from './RecipeForm.svelte';
	import Recipe from './RecipeTeaser.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Home</title> 
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Submit your favorite recipe</h1>

	{#each data.recipes as recipe}
		<Recipe recipe={recipe}/>
	{/each}
	<RecipeForm />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
