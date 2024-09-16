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
    }

    p {
        margin: 10px;
    }

    @media (max-width: 800px) {
        .panel {
            pointer-events: none;
            /* height: 50vh; */
        }

        :global(.panel a){
            pointer-events: all;
        }
    }
</style>
