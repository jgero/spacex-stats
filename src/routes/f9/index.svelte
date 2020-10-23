<script context="module">
    export async function preload(page, session) {
        // get all cores from the api
        const res = await this.fetch(
            "https://api.spacexdata.com/v3/cores?block=5"
        );
        let cores = await res.json();
        // sort them by first launch date
        cores = cores.sort(
            (a, b) => new Date(a.original_launch) > new Date(b.original_launch)
        );

        const launchesPerMonthReq = await this.fetch(
            "f9/launchesPerMonth.json"
        );
        const launchesPerMonth = await launchesPerMonthReq.json();
        return { cores, launchesPerMonth };
    }
</script>

<script>
    import falcon from "images/f9.jpg";
    import { onMount } from "svelte";
    import Chart from "chart.js";
    import { barOptions, lineOptions } from "./_options.js";

    export let cores = [];
    export let launchesPerMonth = [];
    onMount(() => {
        // core bar chart
        new Chart(document.getElementById("coreChart"), {
            type: "bar",
            data: {
                labels: cores.map((core) => core.core_serial),
                datasets: [
                    {
                        label: "# of flights",
                        data: cores.map((core) => core.reuse_count + 1),
                        backgroundColor: cores.map((core) => {
                            if (
                                core.status === "lost" ||
                                core.status === "expended"
                            ) {
                                return "rgba(255, 0, 0, 0.5)";
                            } else if (core.status === "active") {
                                return "rgba(0, 255, 0, 0.5)";
                            } else {
                                return "rgba(0, 0, 0, 0.5)";
                            }
                        }),
                        borderWidth: 1,
                    },
                ],
            },
            options: barOptions,
        });

        new Chart(document.getElementById("flightChart"), {
            type: "line",
            data: {
                labels: launchesPerMonth.map((launch) => launch.month),
                datasets: [
                    {
                        label: "# of flights",
                        data: launchesPerMonth.map((launch) => launch.launches),
                    },
                ],
            },
            options: lineOptions,
        });
    });
</script>

<style>
    div.page-wrapper {
        width: 100%;
        background-color: #00335c;
    }

    div.screen-one {
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: 10% auto 5% 55%;
        grid-template-rows: 10% 40% 50%;
        grid-template-areas: ". . . ." ". . . f9" ". headings . f9";
    }

    img.background {
        grid-area: f9;
        width: 100%;
    }

    header {
        grid-area: headings;
    }

    h1 {
        font-size: 72px;
        margin: 0;
        color: #e6e6e6;
    }

    h2 {
        font-size: 24px;
        font-weight: 300;
        color: #f1c46d;
        margin: 0.2em 0 0 0;
    }

    canvas {
        max-width: 40vw;
    }

    figure {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: 0;
        padding: 32px;
        box-sizing: border-box;
    }

    figcaption {
        width: 400px;
    }

    figcaption > h3 {
        font-size: 24px;
        color: #e6e6e6;
    }
    figcaption > p {
        font-size: 18px;
        font-weight: 300;
        color: #f1c46d;
    }
    .spacer {
        height: 20vh;
    }
</style>

<svelte:head>
    <title>SpaceX Stats - Falcon 9</title>
</svelte:head>

<div class="page-wrapper">
    <div class="screen-one">
        <img class="background" alt="Falcon 9" src={falcon} />
        <header>
            <h1>Falcon 9</h1>
            <h2>First orbital class rocket capable of reflight</h2>
        </header>
    </div>

    <figure>
        <canvas id="coreChart" />
        <figcaption>
            <h3>booster fleet</h3>
            <p>
                The status of boosters with black bars is unknown, red bar means
                expended or lost, green means operational
            </p>
        </figcaption>
    </figure>
    <div class="spacer" />
    <figure>
        <figcaption>
            <h3>launch cadence</h3>
            <p>
                The steadily increasing launch cadence of Falcon 9 since january
                2014
            </p>
        </figcaption>
        <canvas id="flightChart" />
    </figure>
</div>
