<script lang="typescript">
  import type { ICategory } from "types/jd";

  import { createEventDispatcher, onMount } from "svelte";
  import { DialogContent } from "svelte-accessible-dialog";
  import { CloseButton } from "./button-elements";
  import { CreateThingForm, CountText, ThingsDraggable } from "./";
  import { groupedThings } from "../stores";
  import { MAX_THING_COUNT } from "../data/constants";

  export let category: ICategory;

  let modalEl;
  let thingsCount = 0;
  let showThings = false; // delay to make dialog loading fast

  const dispatch = createEventDispatcher();

  const handleClose = () => { dispatch("close") }; // prettier-ignore

  // Scroll to area bottom when new thing is added.
  const scrollToBottom = (e) => {
    const ITEM_H = 40;
    modalEl = document.querySelector(`[data-svelte-dialog-content]`);
    setTimeout(() => {
      if (modalEl) modalEl.scrollTop = modalEl.scrollHeight + ITEM_H;
    }, 50);
  };

  onMount(() => {
    setTimeout(() => { showThings = true }, 50); // prettier-ignore
  });

  $: {
    if ($groupedThings && $groupedThings[category.id]) thingsCount = $groupedThings[category.id]?.length;
  }
</script>

<DialogContent
  class="jd-dialog-content--w-md jd-dialog-content--h-full"
  aria-label={`manage category ${category.jdReadableId}, ${category.name}`}
>
  <div class="jd-header-in-list">
    <div class="jd-id-and-name">
      <code class="jd-id">{category.jdReadableId}</code>
      <strong class="jd-name">{category.name}</strong>
    </div>
    <CloseButton on:click={handleClose} />
  </div>

  {#if showThings && thingsCount}
    <ThingsDraggable {category} />
  {:else}
    <div aria-hidden="true" />
  {/if}

  {#if thingsCount < MAX_THING_COUNT}
    <div class="jd-create-container">
      <CreateThingForm categoryId={category.id} on:created={scrollToBottom} />
      <CountText count={thingsCount} countType="THING" />
    </div>
  {/if}
</DialogContent>

<style type="text/postcss">
  .jd-header-in-list {
    @apply sticky top-0 p-4;
  }
  :global(.jd-dialog-content--w-md) {
    @apply grid;
    grid-template-rows: min-content 1fr min-content;
  }
  .jd-create-container {
    @apply sticky bottom-0;
  }
</style>
