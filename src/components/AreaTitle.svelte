<script lang="typescript">
  import type { IAreaWithItems } from "types/jd";

  import { EditButton, DeleteButton, SubmitButton, CancelButton } from "./button-elements";
  import { createAreaJdId } from "../utils/jd-id-builder";
  import { reorderItems } from "../utils/dnd-helpers";
  import { areas } from "../stores";

  export let area: IAreaWithItems;

  let isEditing = false;
  let newName = area.name || "";
  let inputRef;

  const handleRemoveArea = (areaId: IAreaWithItems["id"]) => {
    const updatedAreas = reorderItems($areas.filter((area) => area.id !== areaId)); // prettier-ignore
    $areas = updatedAreas;
  };

  const saveName = () => {
    if (!newName) return alert("please fill in name");
    area.name = newName;
    const areaIndex = $areas.findIndex((a) => a.id === area.id);
    $areas[areaIndex] = area;
    isEditing = false;
  };

  const toggleEditing = () => {
    isEditing = !isEditing;
  };

  $: if (isEditing && inputRef) inputRef.focus();
</script>

<div class="jd-area__title jd-header-in-list">
  {#if isEditing}
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
  {:else}
    <div class="jd-id-and-name">
      <code class="jd-id">{createAreaJdId(area.order)}</code>
      <strong class="jd-name">{area.name}</strong>
    </div>
    <div class="jd-actions">
      <EditButton on:click={toggleEditing} />
      <DeleteButton on:click={() => handleRemoveArea(area.id)} />
    </div>
  {/if}
</div>

<style type="text/postcss">
  .jd-area__title {
    @apply flex items-center justify-between relative h-12 p-2;
  }
  .jd-actions {
    @apply sr-only right-2 grid gap-1;
    position: absolute !important;
    grid-template-columns: repeat(2, auto);
  }
  .jd-area__title:focus-within .jd-actions,
  .jd-area__title:hover .jd-actions,
  .jd-area__title:focus .jd-actions {
    @apply not-sr-only;
  }
  .jd-form-set {
    @apply h-full flex-1;
  }
</style>
