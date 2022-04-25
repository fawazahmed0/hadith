<script>
	const fetchImage = (async () => {
		const response = await fetch('https://dog.ceo/api/breeds/image/random')
    return await response.json()
	})()
</script>

{#await fetchImage}
	<p>...waiting</p>
{:then data}
	<img src={data.message} alt="Dog image" />
{:catch error}
	<p>An error occurred!</p>
{/await}