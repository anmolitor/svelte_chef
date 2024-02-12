<script>
	import RecipeDetail from './RecipeDetail.svelte';

  /** @type {import('./$types').PageData} */
	export let data;
</script>

<RecipeDetail recipe={data.recipe}></RecipeDetail>