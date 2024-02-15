<script>
	import { page } from '$app/stores';
</script>

<h1>{$page.error?.message ?? 'An unexpected error occured!'}</h1>
