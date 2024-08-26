<script>
    import { selected } from "$lib/stores/selected";

    export let point;

    let boxWidth = 250;
    let boxHeight = 200;

    let offsetX = "";

    offsetX = point.direction === "left" ? -boxWidth * 2 - 10 : boxWidth + 10;

    if (point.direction === "right-1") {
        offsetX = boxHeight * 1.5;
    }
    if (point.direction === "right-2") {
        offsetX = boxHeight * 2;
    }

    if (point.direction === "left-1") {
        offsetX = -boxHeight * 1.5;
    }
    if (point.direction === "left-2") {
        offsetX = -boxHeight * 2;
    }

    $: isSelected = $selected?.cx === point.cx && $selected?.cy === point.cy;

    function handleClick() {
        selected.set({
            cx: point.cx,
            cy: point.cy,
            date: point.date,
            lat: point.lat,
            lon: point.lon,
            id: point["Airwars ref code"],
        });
    }
</script>

<g
    on:click={handleClick}
    id={point["Airwars ref code"]}
    style="cursor: pointer; opacity: {isSelected || $selected === null
        ? 1
        : 0.2};"
>
    <line
        class="line"
        x1={point.cx}
        y1={point.cy}
        x2={point.cx + offsetX}
        y2={point.cy}
    />

    <rect
        class="box"
        x={point.cx + offsetX}
        y={point.cy - boxHeight / 2}
        width={boxWidth}
        height={boxHeight}
        rx="10"
        ry="10"
    />

    <circle class="geo" cx={point.cx} cy={point.cy} r="5" />

    <foreignObject
        x={point.cx + offsetX}
        y={point.cy - boxHeight / 2}
        width={boxWidth}
        height={boxHeight}
    >
        <div xmlns="http://www.w3.org/1999/xhtml">
            <!-- <img
                src="gifs/{point['Airwars ref code']}.gif"
                alt={point.date}
                onerror="this.onerror=null;this.src='gifs/test.gif';"
            /> -->

            <video autoPlay loop muted playsInline>
                <track kind="captions" />
                <source
                    src="videos/{point['Airwars ref code']}.mp4"
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    </foreignObject>
</g>

<style>
    .geo {
        fill: black;
    }

    .line,
    .box {
        stroke-width: 2;
        stroke: black;
    }

    .box {
        stroke-width: 4;
    }

    rect {
        pointer-events: none;
    }

    foreignObject {
        pointer-events: auto;
    }

    foreignObject div {
        pointer-events: none;
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
    }
</style>
