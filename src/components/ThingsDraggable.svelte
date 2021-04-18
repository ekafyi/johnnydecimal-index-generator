<script lang="typescript">
  import type { ICategory, IThing } from "types/jd";

  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { ThingTitle } from ".";

  import { svelteAnimateOptions, dndOptions, reorderItems } from "../utils/dnd-helpers"; // prettier-ignore
  import { groupedThings } from "../stores";

  export let category: ICategory;

  let dndItems: IThing[];

  let isDragging = false; // for styling

  $: dndItems = $groupedThings ? $groupedThings[category.id] : [];

  const handleConsiderThings = (e: CustomEvent) => {
    isDragging = true;
    dndItems = e.detail.items;
  };

  const handleFinalizeThings = (e: CustomEvent) => {
    isDragging = false;
    // @ts-ignore
    $groupedThings[category.id] = reorderItems(e.detail.items);
  };
</script>

<section
  class="jd-things"
  use:dndzone={{ ...dndOptions, items: dndItems, type: "THING" }}
  on:consider={handleConsiderThings}
  on:finalize={handleFinalizeThings}
>
  {#each dndItems as thing (thing.id)}
    <div class="jd-thing jd-item-in-list" class:is-dragging={isDragging} animate:flip={svelteAnimateOptions}>
      <ThingTitle {thing} {category} />
    </div>
  {/each}
</section>

<style type="text/postcss">
  .jd-things {
    @apply py-1;
  }
  .jd-thing.is-dragging {
    filter: grayscale(0.9) opacity(0.5) contrast(0.75) brightness(1.25);
  }
</style>
