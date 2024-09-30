<section>
    <div>
        <h1>The</h1>
        <h1>Killings</h1>
        <h1>They</h1>
        <h1>Tweeted</h1>

        <p class="small-heading">An Airwars investigation</p>
        <p>
            By Rowena De Silva, Nikolaj Houmann Mortensen, Joe Dyke, Sanjana
            Varghese, Nathan Walker, Rosie Harris-Davidson, Maia Awada, Azul De
            Monte, Giacomo Nanni, Ahmad Aydi
        </p>
    </div>
    <div>
        <p>
            In the largest public analysis of military strike footage, Airwars,
            in collaboration with Sky News, reviewed hundreds of clips of
            strikes in Gaza released on social media by the Israeli military in
            the first month of the war. By geolocating the footage and matching
            it with Palestinian reports, we identified 17 strikes in which
            civilians were harmed that the Israeli military itself published
            footage of. In these strikes alone, more than 400 Palestinian
            civilians were reported killed.
        </p>

        <p>
            The video above explains the investigation’s findings, while the
            interactive map below features all strike footage we geolocated from
            the first month of the war, including those matched to the Airwars
            civilian harm archive.
        </p>
    </div>
</section>
<hr />

<style>
    section {
        color: var(--primary-color);
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
        padding-bottom: 130px;
        border-bottom: 10px solid rgb(8, 8, 8);
    }

    hr {
        border: none;
        border-bottom: 1px dotted var(--primary-color);
        margin: 0;
        margin-bottom: 2rem;
    }

    div {
        flex: 1;
    }

    div > * {
        max-width: 650px;
    }

    section div:nth-of-type(1) > * {
        max-width: 450px;
    }

    h1 {
        font-size: clamp(2rem, 6vw, 6rem);
        line-height: clamp(2rem, 6vw, 6rem);
        font-weight: 400;
        margin: 0;
        padding: 0;
    }

    p {
        font-size: clamp(1rem, 1vw, 1.6rem);
        line-height: 1.3em;
    }

    .small-heading {
        font-size: clamp(1.6rem, 1.4vw, 2rem);
    }

    .tiny {
        font-size: clamp(0.875rem, 1vw, 1rem);
        opacity: 0.6;
    }

    .explore {
        display: flex;
        align-content: center;
        align-items: center;
        gap: 10px;
    }

    @media (max-width: 800px) {
        section {
            position: unset;
            margin-bottom: 50px;
        }
    }
</style>
