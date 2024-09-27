<section>
    <div>
        <h1>The</h1>
        <h1>Killings</h1>
        <h1>They</h1>
        <h1>Tweeted</h1>

        <p>An Airwars and Sky News investigation</p>
        <p>
            By Rowena De Silva, Joe Dyke, Nikolaj Houman, Sanjana Varghese and
            Nathan Walker
        </p>
        <p class="tiny">
            Additional support from Giacomo Nanni, Azul de Monte, Maia, Rosie
            etc
        </p>
    </div>
    <div>
        <p>
            Explore the intricate landscape of airstrikes in the Middle East and
            unveil the hidden realities behind these strategic military
            maneuvers. Acquire in-depth knowledge about the complexities of
            airstrikes in this particular region, distinguishing between
            verifiable truths and common misconceptions, all the while
            illuminating the current state of affairs.
        </p>

        <p class="explore">
            Explore the map <svg
                width="20"
                height="36"
                viewBox="0 0 24 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.6 20H-1.90735e-06V24.492L12 40.0003L24 24.492L24 20H14.4L14.4 3.25928L9.6 3.25928L9.6 20ZM9.6 20V27.7041H14.4V20L9.6 20Z"
                    fill="#FC540D"
                />
            </svg>
        </p>
    </div>
</section>

<style>
    section {
        color: var(--primary-color);
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px;
        margin-bottom: 100px;
        /* position: sticky;
        top: 0; */
    }

    div {
        flex: 1;
    }

    div > * {
        max-width: 650px;
    }

    h1 {
        font-size: clamp(2rem, 6vw, 6rem);
        font-weight: 400;
        margin: 0;
        padding: 0;
    }

    p {
        font-size: clamp(1.2rem, 1vw, 1.6rem);
        line-height: 1.3em;
    }

    .tiny {
        font-size: clamp(0.875rem, 1vw, 1rem);
        opacity: 0.7;
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
