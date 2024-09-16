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
            <Map {data} />
            <div class="panel">
                <DetailPanel />
            </div>
        </section>
    </section>
{/if}

<style>
    .map {
        margin-top: 20px;
        position: relative;
        height: 100vh;
    }

    p {
        margin: 10px;
    }
</style>
