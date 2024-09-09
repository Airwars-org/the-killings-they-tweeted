<script>
    import Map from "@components/Map.svelte";
    import Legend from "@components/Legend.svelte";
    import { csv } from "d3";
    import { selected } from "$lib/stores/selected";
    import { onMount, tick } from "svelte";

    let data = [];
    let scrollY = 0;
    let lastScrollY = 0;
    let scrollThreshold = 20;

    const handleScroll = async () => {
        await tick();

        scrollY = window.scrollY;

        if (Math.abs(scrollY - lastScrollY) > scrollThreshold) {
            selected.set(null);
            lastScrollY = scrollY;
        }
    };

    onMount(async () => {
        data = await csv("data.csv");
    });
</script>

<!-- <svelte:window on:scroll={handleScroll} /> -->
<svelte:window />

{#if data.length === 0}
    <p>Loading...</p>
{:else}
    <Legend />
    <article>
        <Map {data} />
    </article>
{/if}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgb(8, 8, 8);
        color: white;
        font-family: "Atlas Grotesk", sans-serif;
        font-size: 19px;
        position: relative;
        --primary-color: #fc540d;
    }

    p {
        margin: 10px;
    }

    @font-face {
        font-family: "Atlas Grotesk";
        src: url("./fonts/AtlasGrotesk-Regular.otf") format("opentype");
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: "Atlas Grotesk";
        src: url("./fonts/AtlasGrotesk-Bold.otf") format("opentype");
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: "Atlas Grotesk";
        src: url("./fonts/AtlasGrotesk-RegularItalic.otf") format("opentype");
        font-weight: normal;
        font-style: italic;
    }
</style>
