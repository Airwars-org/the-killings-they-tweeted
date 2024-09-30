<script>
    import Map from "@components/Map.svelte";
    import Legend from "@components/Legend.svelte";
    import DetailPanel from "@components/DetailPanel.svelte";
    import { csv } from "d3";
    import { onMount } from "svelte";
    import SmallMap from "./SmallMap.svelte";
    import { selected } from "$lib/stores/selected";

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
        <section>
            {#if windowWidth <= 800}
                <Legend />
            {/if}
            <div class="sticky">
                <div class="intro small-heading">
                    <p>Geolocated Israeli military strike footage in Gaza</p>
                    <p class="tiny">Oct 7th – Nov 7th, 2023</p>
                </div>
                <div class="panel">
                    {#if !$selected}
                        {#if windowWidth > 800}
                            <Legend />
                        {/if}
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
        position: relative;
    }

    .intro {
        /* font-size: 1.8rem; */
        color: #8c8c8c;
        color: var(--primary-color);
        width: 100%;
        position: absolute;
    }

    .small-heading {
        font-size: clamp(1.6rem, 1.4vw, 2rem);
    }

    .tiny {
        font-size: clamp(1rem, 1vw, 1rem);
    }

    .intro p {
        max-width: 360px;
        margin-bottom: 0;
        margin-top: 0;
        /* opacity: 0.6; */
        /* font-size: clamp(14px, 1vw, 16px); */
        /* text-align: right; */
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
        padding-bottom: 100px;
    }

    .panel {
        z-index: 1;
        margin-left: calc(100vw - 320px - 10px);
        overflow: scroll;
    }

    .small {
        position: absolute;
        z-index: -1;
        bottom: 100px;
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
