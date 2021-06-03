<script lang="typescript">
  import type { IAreaWithItems } from "types/jd";

  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { AreaTitle, CategoryTitle, CreateCategoryForm, CountText } from ".";
  import { svelteAnimateOptions, dndOptions, dndFlipOption, reorderItems, addGroupedCategoriesToAreas } from "../utils/dnd-helpers"; // prettier-ignore
  import { areas, groupedCategories } from "../stores";
  import { MAX_CATEGORY_COUNT } from "../data/constants";

  let dndItems: IAreaWithItems[] = []; // passed to dndZone as props

  let areaContentEl; // for scroll to bottom when new area is added

  let isDraggingArea = false; // for styling
  let isDraggingCategory = false;

  const handleConsiderAreas = (e: CustomEvent) => {
    isDraggingArea = true;
    $areas = e.detail.items;
  };

  const handleFinalizeAreas = (e: CustomEvent) => {
    isDraggingArea = false;
    const updatedAreas = reorderItems(e.detail.items);
    $areas = updatedAreas;
  };

  const handleConsiderCategories = (areaId: IAreaWithItems["id"], e: CustomEvent) => {
    isDraggingCategory = true;
    const catIndex = dndItems.findIndex((c) => c.id === areaId);
    dndItems[catIndex].items = e.detail.items;
    dndItems = [...dndItems];
  };

  const handleFinalizeCategories = (areaId: IAreaWithItems["id"], e: CustomEvent) => {
    isDraggingCategory = false;
    // Get this category's parent area
    const catIndex = dndItems.findIndex((c) => c.id === areaId);
    const parentArea = dndItems[catIndex];
    // @ts-ignore
    $groupedCategories[parentArea.id] = reorderItems(e.detail.items);
  };

  // Scroll to area bottom when new category is added.
  // Note: Can't use svelte bind:this because element is in "each" block.
  const scrollToBottom = (e) => {
    const ITEM_H = 48;
    const areaId = e.detail.areaId;
    if (areaId) areaContentEl = document.querySelector(`[data-area-id="${areaId}"]`);
    setTimeout(() => {
      if (areaContentEl) areaContentEl.scrollTop = areaContentEl.scrollHeight + ITEM_H;
    }, 50);
  };

  // = = =

  $: {
    dndItems = addGroupedCategoriesToAreas($areas, $groupedCategories);
  }
</script>

<section
  class="jd-outer"
  use:dndzone={{ ...dndOptions, items: dndItems }}
  on:consider={handleConsiderAreas}
  on:finalize={handleFinalizeAreas}
>
  {#each dndItems as area (area.id)}
    <div class="jd-area" class:is-dragging={isDraggingArea || isDraggingCategory} animate:flip={svelteAnimateOptions}>
      <AreaTitle {area} />
      <div
        class="jd-area__content"
        data-area-id={area.id}
        use:dndzone={{
          ...dndFlipOption,
          items: area.items,
          dropFromOthersDisabled: area?.items.length >= MAX_CATEGORY_COUNT,
        }}
        on:consider={(e) => handleConsiderCategories(area.id, e)}
        on:finalize={(e) => handleFinalizeCategories(area.id, e)}
      >
        {#if area?.items}
          {#each area.items as category (category.id)}
            <div
              class="jd-cat jd-item-in-list"
              class:is-dragging={isDraggingCategory}
              animate:flip={svelteAnimateOptions}
            >
              <CategoryTitle {category} {area} />
            </div>
          {/each}
        {/if}
      </div>
      {#if area?.items?.length < MAX_CATEGORY_COUNT}
        <div class="jd-create-container">
          <CreateCategoryForm areaId={area.id} on:created={scrollToBottom} />
          <CountText items={area.items} countType="CATEGORY" />
        </div>
      {/if}
    </div>
  {/each}
</section>

<style type="text/postcss">
  .jd-outer {
    @apply grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2 focus:outline-black lg:px-4 xl:px-8 max-w-xs sm:max-w-none mx-auto;
  }
  .jd-outer:empty {
    @apply focus:outline-none;
  }
  .jd-area {
    --area-card-h: auto;
    @apply bg-ejd-surface border-ejd-border border-2 rounded flex flex-col focus:outline-black;
    box-shadow: 4px 4px 0 #111;
    height: var(--area-card-h);

    /*Notice we make sure this container doesn't scroll so that the title stays on top and the dndzone inside is scrollable*/
    overflow-y: hidden;
  }
  .jd-area__content {
    @apply flex-1 focus:outline-black;

    /* Notice that the scroll container needs to be the dndzone if you want dragging near the edge to trigger scrolling */
    overflow-y: scroll;
    /* For mobile view */
    min-height: 3rem;
  }
  .jd-area.is-dragging,
  .jd-cat.is-dragging {
    filter: grayscale(0.9) opacity(0.5) contrast(0.75) brightness(1.25);
  }
  :global(.jd-cat#dnd-action-dragged-el, .jd-thing#dnd-action-dragged-el) {
    @apply bg-ejd-surfaceHover border-none focus:outline-black !important;
  }
  /** Customize area height */
  @media (min-width: 640px) {
    .jd-area {
      --area-card-h: 18rem;
    }
  }
  /** Customize last orphan grid item in lg screen (4-column grid) */
  @media (min-width: 1024px) {
    .jd-area:nth-child(9):last-child {
      grid-column: 2/4;
      margin-left: 25%;
      margin-right: 25%;
    }
  }
</style>
