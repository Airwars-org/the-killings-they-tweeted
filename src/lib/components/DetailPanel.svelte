<script>
    import { onMount } from "svelte";
    import { selected } from "$lib/stores/selected";
    import { onDestroy } from "svelte";

    let panelVisible = false;

    let selectedPoint = null;
    let panelRef;

    $: selected.subscribe((value) => {
        selectedPoint = value;
        panelVisible = !!selectedPoint;
    });

    onMount(() => {
        document.addEventListener("click", handleClickOutside, true);
    });

    onDestroy(() => {
        document.removeEventListener("click", handleClickOutside, true);
    });

    function handleClickOutside(event) {
        if (panelVisible && panelRef && !panelRef.contains(event.target)) {
            selected.set(null);
        }
    }
</script>

{#if panelVisible}
    <div bind:this={panelRef} class="panel">
        <div class="close" on:click={() => selected.set(null)}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.48528 12.6065L9.54594 13.6672L10.6066 14.7278L2.12132 23.2131L0 21.0918L8.48528 12.6065Z"
                    fill="#FC540D"
                />
                <path
                    d="M10.6066 8.48528L9.54596 9.54594L8.4853 10.6066L1.68061e-05 2.12132L2.12134 0L10.6066 8.48528Z"
                    fill="#FC540D"
                />
                <path
                    d="M23.2133 21.0918L22.1526 22.1525L21.092 23.2132L12.6067 14.7279L14.728 12.6066L23.2133 21.0918Z"
                    fill="#FC540D"
                />
                <path
                    d="M21.092 -4.98836e-05L22.1526 1.06061L23.2133 2.12127L14.728 10.6066L12.6067 8.48523L21.092 -4.98836e-05Z"
                    fill="#FC540D"
                />
            </svg>
        </div>
        {#if selectedPoint.id && selectedPoint["Airwars ref code"]}
            <div class="video">
                <video autoplay loop muted>
                    <track kind="captions" />
                    <source
                        src="videos/{selectedPoint['Airwars ref code']}.webm"
                        type="video/webm"
                    />
                    <source
                        src="videos/{selectedPoint['Airwars ref code']}.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
        {/if}
        <div>
            <!-- {selectedPoint['Airwars ref code']} -->
            {#if selectedPoint.id}
                <div class="icon">
                    <svg
                        width="13"
                        height="19"
                        viewBox="0 0 13 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13 0H0V10.1739L6.5 18.3696L13 10.1739V0ZM6.5 10.3329C8.52905 10.3329 10.1739 8.66231 10.1739 6.60156C10.1739 4.54081 8.52905 2.87024 6.5 2.87024C4.47095 2.87024 2.82609 4.54081 2.82609 6.60156C2.82609 8.66231 4.47095 10.3329 6.5 10.3329Z"
                        />
                    </svg>
                </div>
            {/if}
            <div class="metadata">
                <!-- {#if selectedPoint.id}
                {selectedPoint.id}
            {/if} -->

                {#if selectedPoint.Title}
                    <div>
                        <h1>{selectedPoint.Title}</h1>
                    </div>
                {/if}

                {#if selectedPoint.Location || selectedPoint.lat || selectedPoint.lon}
                    <div>
                        <h3>Location</h3>
                        {#if selectedPoint.Location}
                            <h2>{selectedPoint.Location}</h2>
                        {/if}
                        {#if selectedPoint.lat}
                            <span>{selectedPoint.lat}</span>
                        {/if}
                        {#if selectedPoint.lon}
                            <span>{selectedPoint.lon}</span>
                        {/if}
                    </div>
                {/if}

                {#if selectedPoint["Incident date"]}
                    <div>
                        <h3>Incident Date</h3>
                        <h2>{selectedPoint["Incident date"]}</h2>
                    </div>
                {/if}

                {#if selectedPoint["Post date"]}
                    <div>
                        <h3>Post Date</h3>

                        <span class="ico">
                            {#if selectedPoint["Footage link"]}
                                <a
                                    class="footage-link"
                                    href={selectedPoint["Footage link"]}
                                    target="_blank"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 38 38"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            width="37.6627"
                                            height="37.6627"
                                            rx="18.8314"
                                            fill="#120908"
                                        />
                                        <path
                                            fill-rule="evenodd"
                                            clip-rule="evenodd"
                                            d="M23.1892 8L29.6626 14.4734L24.5965 19.5396L20.0627 20.0627L19.5396 24.5966L14.4734 29.6627L8.00002 23.1893L13.0662 18.1232L17.5999 17.6L18.1231 13.0661L23.1892 8ZM24.8016 15.02L22.6438 12.8622L12.7179 22.7881L14.8757 24.9459L24.8016 15.02Z"
                                        />
                                    </svg>
                                    <h2 style="display: inline;">
                                        {selectedPoint["Post date"]}
                                    </h2>
                                </a>
                            {/if}
                        </span>
                    </div>
                {/if}

                {#if selectedPoint["Civilians reported killed"]}
                    <div>
                        <h3>Civilians reported killed</h3>
                        <h2>{selectedPoint["Civilians reported killed"]}</h2>
                    </div>
                {/if}
            </div>
        </div>
        {#if selectedPoint["Civilians reported killed"]}
            <button
                ><a href={selectedPoint["Airwars link"]} target="_blank"
                    >Full Incident report <svg
                        width="24"
                        height="15"
                        viewBox="0 0 24 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.0001 9V15L13.7565 15L23.2728 7.5L13.7565 0H11.0001V6L0.727539 6V9L11.0001 9ZM11.0001 9H15.7275V6H11.0001L11.0001 9Z"
                            fill="black"
                        />
                    </svg>
                </a></button
            >
        {/if}
    </div>
{/if}

<style>
    .panel {
        width: 320px;
        height: fit-content;
        color: var(--primary-color);
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
        overflow-y: auto;
    }

    video {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }

    .video {
        position: relative;
    }

    .video svg {
        position: absolute;
        bottom: 8px;
        right: 8px;
    }

    .ico a {
        color: var(--primary-color);
        display: flex;
        align-content: center;
        align-items: center;
    }

    .footage-link svg path {
        fill: var(--primary-color);
    }

    button {
        width: 100%;
        height: 62px;
        margin-top: 8px;
        font-size: 22px;
        background-color: var(--primary-color);
        border: none;
        border-radius: 8px;
        cursor: pointer;
    }

    button:hover {
        background-color: white;
    }

    a {
        color: black;
        text-decoration: none;
    }

    .metadata {
        font-size: 13px;
    }

    .metadata div {
        border-bottom: 1px solid;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }

    .panel > div:not(:first-of-type) {
        display: flex;
        gap: 5px;
        padding: 15px;
        background-color: #120908;
        border-radius: 8px;
    }

    .icon {
        padding: 4px;
    }

    .icon svg path {
        fill: var(--primary-color);
    }

    h1 {
        margin: 0;
        padding: 0;
        font-size: 24px;
        font-weight: 400;
    }

    h2 {
        margin: 0;
        padding: 0;
        font-size: 19px;
        font-weight: 400;
    }

    h3 {
        font-size: 10px;
        text-transform: uppercase;
        margin: 5px 0;
        padding: 0;
        font-weight: 400;
        opacity: 40%;
    }

    .close {
        display: none;
    }

    @media (max-width: 800px) {
        .panel {
            background-color: black;
            padding: 10px;
            width: calc(100vw - 20px);
            height: 100vh;
            overflow: scroll;
        }

        .close {
            display: block;
            width: 100%;
        }

        button {
            font-size: 16px;
        }

        .metadata {
            width: 100%;
            font-size: 8px;
        }

        h1 {
            font-size: 18px;
        }
        h2 {
            font-size: 14px;
        }
    }
</style>
