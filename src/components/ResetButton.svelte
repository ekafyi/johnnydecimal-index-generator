<script>
  import { areas, groupedCategories, groupedThings } from "../stores";
  const yeet = () => {
    $areas = [];
    $groupedCategories = null;
    $groupedThings = null;
    localStorage.removeItem("areas");
    localStorage.removeItem("groupedCategories");
    localStorage.removeItem("groupedThings");
  };
</script>

{#if $areas?.length}
  <div>
    or <button type="button" class="jd-inline-action" on:click={yeet}>start over</button>
  </div>
{/if}

<style type="text/postcss">
  div {
    text-align: center;
  }
</style>
