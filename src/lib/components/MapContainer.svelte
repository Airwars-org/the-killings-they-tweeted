<script>
    import Map from "@components/Map.svelte";
    import Legend from "@components/Legend.svelte";
    import DetailPanel from "@components/DetailPanel.svelte";
    import { csv } from "d3";
    import { onMount } from "svelte";
    import SmallMap from "./SmallMap.svelte";

    let data = [];
    let mapContainer;
    let windowWidth = 0;
    let scrollPercentage = 0;
    let containerHeight = 0;
    let viewportHeight = 0;

    const handleResize = () => {
        windowWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
    };

    const handleScroll = () => {
        if (mapContainer) {
            const containerBounds = mapContainer.getBoundingClientRect();
            containerHeight = containerBounds.height;

            const maxScrollHeight = containerHeight - viewportHeight;
            const scrolledDistance = Math.max(0, -containerBounds.top);

            scrollPercentage = Math.min(
                Math.max(0, (scrolledDistance / maxScrollHeight) * 100),
                100,
            );
        }
    };

    onMount(async () => {
        data = await csv("data.csv");
        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
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
                        <SmallMap
                            {data}
                            {windowWidth}
                            {scrollPercentage}
                            {containerHeight}
                            {viewportHeight}
                        />
                    </div>
                {/if}
            </div>
            <div class="mapContainer" bind:this={mapContainer}>
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
        overflow: scroll;
    }

    .small {
        position: absolute;
        z-index: -1;
        bottom: 10px;
        margin: 10px;
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
        }

        .sticky {
            top: 0px;
        }
    }
</style>
