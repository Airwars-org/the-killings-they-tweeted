<script>
    import Video from "@components/Video.svelte";
    import Header from "@components/Header.svelte";

    import MapContainer from "@components/MapContainer.svelte";
</script>

<!-- <svelte:window on:scroll={handleScroll} /> -->
<svelte:window />

<article>
    <Video />
    <Header />
    <MapContainer />
</article>

<style>
    :global(html) {
        --primary-color: rgb(252, 84, 13);
        /* background-color: var(--primary-color); */
        background-color: rgb(8, 8, 8);
        overflow: hidden;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        color: white;
        font-family: "Atlas Grotesk", sans-serif;
        font-size: 19px;
        position: relative;
        background-image: radial-gradient(
            rgb(252, 84, 13, 0.2) 1px,
            rgb(8, 8, 8, 0.5) 1px
        );
        background-size: 30px 30px;
        height: 100vh;
        overflow: scroll;
    }

    :global(::selection) {
        background-color: var(--primary-color);
        color: black;
    }

    article {
        max-width: 1920px;
        display: block;
        margin: 0 auto;
   
    }

    @font-face {
        font-family: "Atlas Grotesk";
        src: url("./fonts/AtlasGrotesk-Regular.otf") format("opentype");
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: "Atlas Grotesk";
        src: url("./fonts/AtlasGrotesk-Bold.otf") format("opentype");
        font-weight: bold;
        font-style: normal;
    }

    @font-face {
        font-family: "Atlas Grotesk";
        src: url("./fonts/AtlasGrotesk-RegularItalic.otf") format("opentype");
        font-weight: normal;
        font-style: italic;
    }
</style>
