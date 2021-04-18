<script lang="typescript">
  import type { IAreaWithItems, ICategory } from "types/jd";

  import { fade } from "svelte/transition";
  import { DialogOverlay } from "svelte-accessible-dialog";
  import { CategoryThingsContent } from ".";
  import { EditButton, DeleteButton, SubmitButton, CancelButton } from "./button-elements";
  import { createCategoryJdId } from "../utils/jd-id-builder";
  import { reorderItems } from "../utils/dnd-helpers";
  import { groupedCategories } from "../stores";

  export let category: ICategory;
  export let area: IAreaWithItems;

  let isEditing = false;
  let newName = category.name || "";
  let inputRef;

  const handleRemoveCategory = (catId: ICategory["id"], areaId: IAreaWithItems["id"]) => {
    const updatedGroup = reorderItems($groupedCategories[areaId].filter((cat) => cat.id !== catId));
    // @ts-ignore
    $groupedCategories[areaId] = updatedGroup;
  };

  const saveName = () => {
    if (!newName) return alert("please fill in name");
    category.name = newName;
    $groupedCategories[area.id] = $groupedCategories[area.id];
    isEditing = false;
  };

  const toggleEditing = () => {
    isEditing = !isEditing;
  };

  // Category detail dialog
  let isCategoryOpen;
  let activeCategory: ICategory;
  const openCategoryDetail = (category: ICategory, area: IAreaWithItems) => {
    if (activeCategory) return alert("close previous category before editing new one");
    isCategoryOpen = true;
    activeCategory = { ...category, jdReadableId: createCategoryJdId(category.order, area.order) };
  };
  const closeCategoryDetail = () => {
    isCategoryOpen = false;
    activeCategory = null;
  };

  $: if (isEditing && inputRef) inputRef.focus();
</script>

<div class="jd-category__title" in:fade>
  {#if isEditing}
    <div class="jd-category__title__spacer">
      <form class="jd-form-set" on:submit|preventDefault={saveName}>
        <input
          class="jd-text-input"
          type="text"
          bind:this={inputRef}
          bind:value={newName}
          on:keydown={(e) => {
            if (e.key === "Escape") isEditing = false;
          }}
        />
        <SubmitButton>save</SubmitButton>
      </form>
      <CancelButton on:click={toggleEditing}>esc</CancelButton>
    </div>
  {:else}
    <div class="jd-id-and-name">
      <code class="jd-id">{createCategoryJdId(category.order, area.order)}</code>
      <strong class="jd-name">{category.name}</strong>
    </div>
    <div class="jd-actions">
      <button on:click={() => openCategoryDetail(category, area)} class="jd-icon-button jd-icon-button--standard"
        >+</button
      >
      <EditButton on:click={toggleEditing} />
      <DeleteButton on:click={() => handleRemoveCategory(category.id, area.id)} />
    </div>
  {/if}
</div>

<DialogOverlay isOpen={isCategoryOpen} onDismiss={closeCategoryDetail}>
  <CategoryThingsContent category={activeCategory} on:close={closeCategoryDetail} />
</DialogOverlay>

<style type="text/postcss">
  .jd-category__title {
    @apply flex items-center justify-between relative px-2 py-3;
  }
  .jd-name {
    @apply text-sm;
  }
  .jd-actions {
    @apply sr-only right-2 grid gap-1;
    position: absolute !important;
    grid-template-columns: repeat(3, auto);
  }
  .jd-category__title:focus-within .jd-actions,
  .jd-category__title:hover .jd-actions,
  .jd-category__title:focus .jd-actions {
    @apply not-sr-only;
  }
  .jd-category__title:focus-within .jd-id-and-name,
  .jd-category__title:hover .jd-id-and-name,
  .jd-category__title:focus .jd-id-and-name {
    max-width: calc(100% - 5rem);
  }
  .jd-category__title__spacer {
    @apply h-8 w-full flex justify-between;
  }
  .jd-category__title__spacer .jd-form-set {
    @apply flex-1;
  }
  :global(.jd-category__title .jd-form-set button[type="submit"]) {
    @apply text-sm;
  }
</style>
