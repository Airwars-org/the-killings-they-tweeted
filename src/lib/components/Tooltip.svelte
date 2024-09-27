<script>
    import { selected } from "$lib/stores/selected";
    import { points } from "$lib/stores/points";

    export let point;
    export let w;

    let boxWidth = 195;
    let boxHeight = 122;

    let offsetX = "";
    let lineMargin;

    $: {
        if (w <= 768) {
            boxWidth = w / 6;
            boxHeight = w / 9;
        } else {
            boxWidth = 195;
            boxHeight = 122;
        }

        lineMargin =
            point.direction === "left" ||
            point.direction === "left-1" ||
            point.direction === "left-2"
                ? -4
                : 9;

        if (point.direction.startsWith("right")) {
            if (point.direction === "right") {
                offsetX = boxHeight / 2;
            } else if (point.direction === "right-1") {
                offsetX = boxHeight;
            } else if (point.direction === "right-2") {
                offsetX = boxHeight * 2;
            }
        } else if (point.direction.startsWith("left")) {
            if (point.direction === "left") {
                offsetX = -(boxWidth + boxHeight / 2);
            } else if (point.direction === "left-1") {
                offsetX = -(boxWidth + boxHeight);
            } else if (point.direction === "left-2") {
                offsetX = -(boxWidth + boxHeight * 2);
            }
        }
    }

    $: isSelected = $selected?.cx == point.cx && $selected?.cy == point.cy;

    $: {
        if (isSelected) {
            bringToFront(point);
        }
    }

    function handleClick(e) {
        const groupID = point["Group ID"] || null;

        const relatedPoints = $points.filter(
            (p) =>
                p["Group ID"] === groupID &&
                p["Unmatched ID"] !== point["Unmatched ID"],
        );

        selected.set({
            ...point,
            cx: point.cx,
            cy: point.cy,
            lat: point.lat,
            lon: point.lon,
            id: point["Unmatched ID"],
            related: relatedPoints.map((p) => ({
                ...p,
                cx: p.cx,
                cy: p.cy,
                lat: p.lat,
                lon: p.lon,
                id: p["Unmatched ID"],
            })),
        });

        bringToFront(e);
    }

    $: markerTranslateX = point.cx - 10;
    $: markerTranslateY = point.cy - 30;

    let yOffset = 29;

    function bringToFront(elementOrPoint) {
        let element;
        if (elementOrPoint instanceof Event) {
            element = elementOrPoint.target.closest("g");
            if (element && element.parentNode) {
                element.parentNode.appendChild(element);
            }
        }
        if (elementOrPoint?.["Unmatched ID"]) {
            element = document.getElementById(point["Unmatched ID"]);
            const pointsGroup = document.querySelector(".points");
            if (element && element.parentNode) {
                const parentGroup = element.parentNode;
                pointsGroup.appendChild(parentGroup);
            }
        }
    }
</script>

<g
    on:click={handleClick}
    id={point["Airwars ref code"]}
    class:selected={isSelected}
>
    {#if point["Airwars ref code"]}
        <!-- {#if w > 768} -->
        <line
            class="line"
            x1={point.cx - lineMargin}
            y1={point.cy - yOffset}
            x2={point.cx + offsetX}
            y2={point.cy - yOffset}
        />

        <rect
            class="box"
            x={point.cx + offsetX}
            y={point.cy - yOffset - boxHeight / 2}
            width={boxWidth}
            height={boxHeight}
            rx="10"
            ry="10"
        />
        <!-- {/if} -->
        {#if w > 768}
            <svg
                x={markerTranslateX}
                y={markerTranslateY}
                width="15"
                height="24"
                viewBox="0 0 20 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 0H0V15.6522L10 28.2609L20 15.6522V0ZM10 15.8967C13.1216 15.8967 15.6522 13.3266 15.6522 10.1562C15.6522 6.98586 13.1216 4.41576 10 4.41576C6.87839 4.41576 4.34783 6.98586 4.34783 10.1562C4.34783 13.3266 6.87839 15.8967 10 15.8967Z"
                    fill="white"
                />
                <circle cx="10" cy="10.1562" r="5" fill="black" stroke="none" />
            </svg>
        {:else}
            <svg
                x={markerTranslateX}
                y={markerTranslateY}
                width="10"
                height="16"
                viewBox="0 0 20 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20 0H0V15.6522L10 28.2609L20 15.6522V0ZM10 15.8967C13.1216 15.8967 15.6522 13.3266 15.6522 10.1562C15.6522 6.98586 13.1216 4.41576 10 4.41576C6.87839 4.41576 4.34783 6.98586 4.34783 10.1562C4.34783 13.3266 6.87839 15.8967 10 15.8967Z"
                    fill="white"
                />
                <circle cx="10" cy="10.1562" r="5" fill="black" stroke="none" />
            </svg>
        {/if}

        <foreignObject
            x={point.cx + offsetX}
            y={point.cy - yOffset - boxHeight / 2}
            width={boxWidth}
            height={boxHeight}
        >
            <div>
                <video autoplay loop muted webkit-playsinline playsinline>
                    <track kind="captions" />
                    <source
                        src="videos/{point['Airwars ref code'].trim()}.webm"
                        type="video/webm"
                    />
                    <source
                        src="videos/{point['Airwars ref code'].trim()}.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        </foreignObject>
    {:else}
        <ellipse
            class="secondary"
            id={point["Unmatched ID"]}
            cx={point.cx}
            cy={point.cy}
            rx="4"
            ry="4"
        />
    {/if}
</g>

<style>
    .line {
        stroke-width: 2;
        stroke: white;
    }

    foreignObject,
    svg,
    ellipse {
        pointer-events: auto;
        cursor: pointer;
    }

    foreignObject div {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        overflow: hidden;
    }

    img,
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        position: relative;
        filter: grayscale();
    }

    .selected .line,
    .selected .box {
        fill: var(--primary-color);
        stroke: var(--primary-color);
    }

    .selected .box {
        stroke-width: 2;
    }

    .selected path,
    .selected ellipse {
        fill: var(--primary-color);
    }

    .selected foreignObject {
        cursor: pointer;
    }

    .selected div {
        position: relative;
    }

    .selected div:after {
        z-index: 2;
        content: "";
        position: absolute;
        inset: 0;
        background: var(--primary-color);
        mix-blend-mode: multiply;
        border-radius: inherit;
    }

    .selected,
    .selected div {
        fill: var(--primary-color);
        background: var(--primary-color);
    }

    .secondary {
        fill: white;
        stroke: black;
        stroke-width: 1;
    }
</style>
