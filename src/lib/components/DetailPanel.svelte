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
        <video controls autoplay loop muted>
            <track kind="captions" />
            <source src="videos/{selectedPoint.id}.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div class="metadata">
            {selectedPoint.id}

            <div>
                <h1>N civilians killed</h1>
            </div>

            <div>
                <h3>Date:</h3>
                <p>{selectedPoint.date}</p>
            </div>
            <div>
                <h3>Location:</h3>
                <span>{selectedPoint.lat}</span>
                <span>{selectedPoint.lon}</span>
            </div>
            <div>
                <h3>More Metadata</h3>
            </div>
            <div>
                <h3>More Metadata</h3>
            </div>
            <div>
                <h3>More Metadata</h3>
            </div>
        </div>
    </div>
{/if}

<style>
    .panel {
        position: fixed;
        right: 10px;
        top: 10px;
        width: 300px;
        height: fit-content;
        background-color: white;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        overflow-y: auto;
    }

    video {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
    }

    .metadata {
        font-size: 14px;
        padding: 20px;
    }
</style>
