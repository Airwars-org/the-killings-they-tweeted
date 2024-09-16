<script>
    import { onMount, onDestroy } from "svelte";
    import { geoPath, geoMercator } from "d3-geo";
    import * as topojson from "topojson-client";
    import Tooltip from "@components/Tooltip.svelte";
    import DetailPanel from "@components/DetailPanel.svelte";

    export let data;

    let container;
    let width = 0;
    let svgWidth = 0;
    let svgHeight = 0;
    let projection;
    let path;
    let gaza = [];
    let boundary = [];
    let buildings = [];
    let points = [];

    let resizeTimeout;

    onMount(() => {
        fetch("boundary.geojson")
            .then((response) => response.json())
            .then((boundaryData) => {
                boundary = boundaryData.features;
                updateMap();
            });

        fetch("streets.geojson")
            .then((response) => response.json())
            // .then((gazaData) => {
            //     buildings = topojson.feature(
            //         gazaData,
            //         gazaData.objects.streets,
            //     ).geometries;
            //     updateMap();
            // });
            .then((gazaData) => {
                gaza = gazaData.features;
                updateMap();
            });

        fetch("buildings1.json")
            .then((response) => response.json())
            .then((buildingsData) => {
                buildings = topojson.feature(
                    buildingsData,
                    buildingsData.objects.test1,
                ).features;
                updateMap();
            });

        points = data.map((d) => {
            return {
                ...d,
                direction: d["direction"]
                    ? d["direction"]
                    : Math.random() > 0.5
                      ? "left"
                      : "right",
                date: d["Date of incident"],
            };
        });

        window.addEventListener("resize", handleResize);
    });

    function handleResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateMap();
        }, 150); // Adjust the delay time as necessary
    }

    onDestroy(() => {
        window.removeEventListener("resize", handleResize);
    });

    function updateMap() {
        width = container.clientWidth;

        if (gaza.length > 0) {
            projection = geoMercator()
                .rotate([-48, 48])
                .scale(1)
                .translate([0, 0]);

            const pathGenerator = geoPath().projection(projection);
            const bounds = pathGenerator.bounds({
                type: "FeatureCollection",
                features: gaza,
            });

            const dx = bounds[1][0] - bounds[0][0];
            const dy = bounds[1][1] - bounds[0][1];
            const x = (bounds[0][0] + bounds[1][0]) / 2;
            const y = bounds[0][1] + bounds[1][1];

            const padding = [100, 10, 20];
            const scale = (width - padding[0]) / dx;
            const translate = [
                width / 2 - scale * x,
                (-scale - padding[1]) * bounds[0][1] + bounds[1][1],
            ];

            projection = projection.scale(scale).translate(translate);

            path = geoPath().projection(projection);

            svgWidth = width;
            svgHeight = scale * dy + padding[2];

            points = points.map((d) => {
                const [cx, cy] = projection([d.lon, d.lat]);
                return {
                    ...d,
                    cx,
                    cy,
                };
            });
        }
    }
</script>

<article bind:this={container} bind:clientWidth={w}>
    <DetailPanel />

    {#if gaza.length > 0}
        <svg width={svgWidth} height={svgHeight}>
            {#if boundary.length > 0}
                <g class="boundary">
                    {#each boundary as feature, i}
                        <path d={path(feature)} class="boundary" />
                    {/each}
                </g>
            {/if}

            {#if buildings.length > 0}
                <g class="buildings">
                    {#each buildings as feature, i}
                        <path d={path(feature)} class="building" />
                    {/each}
                </g>
            {/if}

            <g class="streets">
                {#each gaza as feature, i}
                    <path d={path(feature)} class="street" />
                {/each}
            </g>

            <g class="points">
                {#each points as point, i}
                    {#if point.cx && point.cy}
                        <Tooltip {point} />
                    {/if}
                {/each}
            </g>
        </svg>
    {/if}

</article>

<style>
    article {
        width: 100%;
        margin-top: -100vh;
    }

    .boundary {
        fill: rgb(20, 20, 20);
        stroke-width: 1px;
        stroke: black;
    }

    .buildings {
        fill: rgb(38, 38, 38);
        stroke: none;
    }

    .streets {
        fill: none;
        stroke-width: 0.5px;
        stroke: rgb(34, 34, 34);
    }
</style>
