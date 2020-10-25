<script>
  import { barOptions } from "./_options";
  import Chart from "chart.js";
  import { onMount } from "svelte";

  let hasLoaded = false;

  onMount(() => {
    // get all cores from the api
    fetch("https://api.spacexdata.com/v3/cores?block=5")
      // just keep the json part of it
      .then((response) => response.json())
      // render the chart
      .then((responseJSON) => {
        // sort the cores by their first flight date
        const cores = responseJSON.sort(
          (a, b) => new Date(a.original_launch) > new Date(b.original_launch)
        );
        // data is now completely loaded
        hasLoaded = true;
        // create the chart
        new Chart(document.getElementById("coreChart"), {
          type: "bar",
          data: {
            labels: cores.map((core) => core.core_serial),
            datasets: [
              {
                label: "# of flights",
                data: cores.map((core) => core.reuse_count + 1),
                backgroundColor: cores.map((core) => {
                  if (core.status === "lost" || core.status === "expended") {
                    return "rgba(221, 97, 90, 0.5)";
                  } else if (core.status === "active") {
                    return "rgba(98, 173, 110, 0.5)";
                  } else {
                    return "rgba(155, 155, 155, 0.5)";
                  }
                }),
                borderWidth: 1,
              },
            ],
          },
          options: barOptions,
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
  {#if !hasLoaded}
    <p>loading...</p>
  {/if}
  <canvas id="coreChart" class={hasLoaded ? 'active' : 'hidden'} />
  <figcaption>
    <h3>booster fleet</h3>
    <p>
      The status of boosters with grey bars is unknown, red bar means expended
      or lost, green means operational
    </p>
  </figcaption>
</figure>
