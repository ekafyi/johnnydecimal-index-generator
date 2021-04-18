<script lang="typescript">
  import type { IThing, ICategory } from "types/jd";

  import { EditButton, DeleteButton, SubmitButton, CancelButton } from "./button-elements";
  import { createThingJdIdFromCategory } from "../utils/jd-id-builder";
  import { reorderItems } from "../utils/dnd-helpers";
  import { groupedThings } from "../stores";

  export let thing: IThing;
  export let category: ICategory;

  let isEditing = false;
  let newName = thing.name || "";
  let inputRef;

  const handleRemoveThing = () => {
    const updatedGroup = reorderItems($groupedThings[category.id].filter((t) => t.id !== thing.id));
    // @ts-ignore
    $groupedThings[category.id] = updatedGroup;
  };

  const saveName = () => {
    if (!newName) return alert("please fill in name");
    thing.name = newName;
    $groupedThings[category.id] = $groupedThings[category.id];
    isEditing = false;
  };

  const toggleEditing = () => {
    isEditing = !isEditing;
  };

  $: if (isEditing && inputRef) inputRef.focus();
</script>

<div class="jd-thing__title">
  {#if isEditing}
    <div class="jd-thing__title__spacer">
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
      <code class="jd-id">{createThingJdIdFromCategory(thing.order, category.jdReadableId || "")}</code>
      <strong class="jd-name">{thing.name}</strong>
    </div>
    <div class="jd-thing__actions">
      <EditButton on:click={toggleEditing} />
      <DeleteButton on:click={handleRemoveThing} />
    </div>
  {/if}
</div>

<style type="text/postcss">
  .jd-thing__title {
    @apply flex justify-between px-4 py-2 text-sm;
  }
  .jd-thing__actions {
    @apply grid gap-1;
    grid-template-columns: repeat(2, auto);
  }
  .jd-id-and-name {
    max-width: calc(100% - 4rem);
  }
  .jd-thing__title__spacer {
    @apply h-6 w-full flex justify-between;
  }
  .jd-thing__title__spacer .jd-form-set {
    @apply flex-1;
  }
  :global(.jd-thing__title .jd-form-set button[type="submit"]) {
    @apply text-sm;
  }
</style>
