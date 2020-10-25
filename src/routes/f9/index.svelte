<script context="module">
  //   export async function preload(page, session) {
  //     // get all cores from the api
  //     const res = await this.fetch("https://api.spacexdata.com/v3/cores?block=5");
  //     let cores = await res.json();
  //     // sort them by first launch date
  //     cores = cores.sort(
  //       (a, b) => new Date(a.original_launch) > new Date(b.original_launch)
  //     );

  //     const launchesPerMonthReq = await this.fetch("f9/launchesPerMonth.json");
  //     const launchesPerMonth = await launchesPerMonthReq.json();
  //     return { cores, launchesPerMonth };
  //   }
</script>

<script>
  import falcon from "images/f9.jpg";
  //   import { onMount } from "svelte";
  import CoreChart from "../../components/f9/CoreChart.svelte";
  import CadenceChart from "../../components/f9/CadenceChart.svelte";
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
  <CoreChart />
  <div class="spacer" />
  <CadenceChart />
</div>
