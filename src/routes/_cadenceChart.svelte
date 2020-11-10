<script>
  import { onMount } from "svelte";

  let hasLoaded = false;

  onMount(() => {
    // get all the launches from the API
    fetch("https://api.spacexdata.com/v3/launches/past?order=asc")
      // only keep the JSON part
      .then((response) => response.json())
      .then((launchesJSON) => {
        let intervals = [];
        // go through the launches and start at the second one to always have a previous one to compare it to
        for (let i = 1; i < launchesJSON.length; i++) {
          // get date objects from launches
          const datePreviousLaunch = new Date(
            launchesJSON[i - 1].launch_date_utc
          );
          const dateCurrentLaunch = new Date(launchesJSON[i].launch_date_utc);
          intervals.push(
            Math.floor(
              (dateCurrentLaunch - datePreviousLaunch) / 1000 / 60 / 60 / 24
            )
          );
        }
        intervals = intervals.map((interval, index) => {
          const arrayToCurrentIndex = intervals.slice(0, index + 1);
          return {
            value: interval,
            average:
              Math.round(
                (arrayToCurrentIndex.reduce((a, b) => a + b) / (index + 1)) *
                  100
              ) / 100,
          };
        });
        // create the chart
        var options = {
          chart: {
            type: "line",
            foreColor: "#FFFFFF",
          },
          series: [
            {
              name: "interval",
              data: intervals.map((interval) => interval.value),
            },
            {
              name: "average",
              data: intervals.map((interval) => interval.average),
            },
          ],
          colors: ["#f1c46d", "#FFFFFF"],
          /* xaxis: { */
          /*   categories: launchesPerMonth.map((month) => month.month), */
          /*   title: { */
          /*     text: "month", */
          /*     style: { */
          /*       color: "#FFFFFF", */
          /*     }, */
          /*   }, */
          /* }, */
          yaxis: {
            title: {
              text: "days",
              style: {
                color: "#FFFFFF",
              },
            },
          },
          stroke: {
            curve: ["straight", "smooth"],
          },
          dataLabels: {
            style: {
              colors: ["#FFFFFF"],
            },
          },
        };

        var chart = new ApexCharts(
          document.querySelector("#cadenceChart"),
          options
        );

        chart.render();

        console.log(intervals);

        // data is completely loaded
        hasLoaded = true;
      });
  });
</script>

<style>
  #cadenceChart {
    width: 40vw;
    color: black;
  }
</style>

{#if !hasLoaded}
  <p>loading...</p>
{/if}

<div id="cadenceChart" />
