<script>
    import Map from "@components/Map.svelte";
    import Legend from "@components/Legend.svelte";
    import DetailPanel from "@components/DetailPanel.svelte";

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

{#if data.length === 0}
    <p>Loading...</p>
{:else}
    <section class="map">
        <Legend />
        <section class="map">
            <div class="panel">
                <DetailPanel />
            </div>
            <div class="mapContainer">
                <Map {data} />
            </div>
        </section>
    </section>
{/if}

<style>
    .map {
        margin-top: 20px;
        position: relative;
        /* background: rgb(8, 8, 8, 0.5); */
        /* box-shadow: 0px -16px 20px 3px rgb(8, 8, 8, 0.5); */
    }

    .mapContainer {
        margin-top: -100vh;
    }

    .panel {
        position: sticky;
        height: 100vh;
        z-index: 1;
        top: 10px;
        margin-left: calc(100vw - 320px - 10px);
        pointer-events: none;
    }

    :global(.panel > .panel) {
        pointer-events: all;
    }

    p {
        margin: 10px;
    }

    @media (max-width: 800px) {
        .panel {
            margin-left: 0;
            top: 0px;
            /* height: 50vh; */
        }
    }
</style>
