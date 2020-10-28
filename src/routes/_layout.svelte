<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
</script>

<style>
  /* div {
  } */
</style>

<header>
  <Nav {segment} />
</header>
<main>
  <slot />
</main>
