<script context="module">
  import fetch from "node-fetch";

  export async function preload() {
    console.log(launchesPerMonth);
    return { launchesPerMonth };

    //   res.setHeader("Content-Type", "application/json");
    //   res.end(JSON.stringify(launchesPerMonth));
  }
</script>

<script>
  import Chart from "chart.js";
  import { lineOptions } from "./_options";
  import { onMount } from "svelte";

  let hasLoaded = false;

  onMount(() => {
    // get the falcon 9 launches per month starting january 2014
    fetch("https://api.spacexdata.com/v3/launches/past?rocket=falcon9")
      .then((response) => response.json())
      .then((launchesJSON) => {
        let launchesPerMonthMap = new Map();
        // create empty map starting january 2014
        let d = new Date(2014, 0);
        while (d < new Date()) {
          launchesPerMonthMap.set(`${d.getMonth() + 1}/${d.getFullYear()}`, 0);
          d = new Date(d.getFullYear(), d.getMonth() + 1);
        }
        debugger;
        // filter out launches before january 2014
        const launches = launchesJSON.filter(
          (launch) => new Date(2014, 0) < new Date(launch.launch_date_utc)
        );
        // count the launches per month
        launches.forEach((launch) => {
          const d = new Date(launch.launch_date_utc);
          launchesPerMonthMap.set(
            `${d.getMonth() + 1}/${d.getFullYear()}`,
            launchesPerMonthMap.get(`${d.getMonth() + 1}/${d.getFullYear()}`) +
              1
          );
        });
        // build an array from the map
        const launchesPerMonth = Array.from(launchesPerMonthMap.keys()).map(
          (key) => ({
            month: key,
            launches: launchesPerMonthMap.get(key),
          })
        );
        hasLoaded = true;
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
  });
</script>

<style>
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
  canvas {
    max-width: 40vw;
  }
</style>

<figure>
  <figcaption>
    <h3>launch cadence</h3>
    <p>The steadily increasing launch cadence of Falcon 9 since january 2014</p>
  </figcaption>
  {#if !hasLoaded}
    <p>loading...</p>
  {/if}
  <canvas id="flightChart" />
</figure>
