<script>
    import Map from "@components/Map.svelte";
    import Legend from "@components/Legend.svelte";
    import DetailPanel from "@components/DetailPanel.svelte";

    import { csv } from "d3";
    import { selected } from "$lib/stores/selected";
    import { onMount } from "svelte";
    import SmallMap from "./SmallMap.svelte";

    let data = [];
    let windowWidth = 0;

    const handleResize = () => {
        windowWidth = window.innerWidth;
    };

    onMount(async () => {
        data = await csv("data.csv");
        handleResize();
        window.addEventListener("resize", handleResize);
    });
</script>

{#if data.length === 0}
    <p>Loading...</p>
{:else}
    <section class="map">
        <section class="map">
            {#if windowWidth <= 800}
                <Legend />
            {/if}
            <div class="sticky">
                <div class="panel">
                    {#if windowWidth > 800}
                        <Legend />
                    {/if}
                    <DetailPanel />
                </div>
                {#if windowWidth > 800}
                    <div class="small">
                        <SmallMap {data} {windowWidth} />
                    </div>
                {/if}
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
        margin-bottom: 100px;
    }

    .sticky {
        position: sticky;
        z-index: 1;
        top: 10px;
        height: 100vh;
        pointer-events: none;
    }

    .panel {
        z-index: 1;
        margin-left: calc(100vw - 320px - 10px);
    }

    .small {
        position: absolute;
        z-index: -1;
        bottom: 10px;
        margin: 10px;
        /* height: 100vh; */
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

        .sticky {
            top: 0px;
        }
    }
</style>
