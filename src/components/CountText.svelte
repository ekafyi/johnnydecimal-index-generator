<script lang="typescript">
  import { getCategoryCountText, getThingCountTextFromLength } from "../utils/str";

  export let items = []; // used by category
  export let count = 0; // used by thing
  export let countType: "CATEGORY" | "THING" = "CATEGORY";
</script>

{#if countType === "CATEGORY"}
  <p class="jd-count jd-count--show-on-focus">{getCategoryCountText(items)}</p>
{:else}
  <p class="jd-count jd-count--show-on-focus">{getThingCountTextFromLength(count)}</p>
{/if}

<style type="text/postcss">
  p {
    @apply text-xs text-gray-600 px-2;
  }
</style>
