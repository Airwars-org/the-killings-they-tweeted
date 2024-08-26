<script>
    import { onMount } from "svelte";
    import Map from "@components/Map.svelte";
    import { csv } from "d3";

    let data = [];
    let width, height;

    onMount(async () => {
        data = await csv("data.csv");
    });
</script>

{#if data.length === 0}
    <p>Loading...</p>
{:else}
    <article bind:clientWidth={width} bind:clientHeight={height}>
        <Map {data} />
    </article>
{/if}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #d5d5d5;
        font-family: Arial, Helvetica, sans-serif;
    }

    p {
        margin: 10px;
    }

    article {
        background-color: #d5d5d5;
    }
</style>
