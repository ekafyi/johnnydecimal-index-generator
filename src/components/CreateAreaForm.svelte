<script lang="typescript">
  import type { IArea } from "types/jd";

  import uuid from "uuid-v4";
  import { SubmitButton } from "./button-elements";
  import { areas } from "../stores";
  import { createAreaJdId } from "../utils/jd-id-builder";
  import { MAX_AREA_COUNT } from "../data/constants";

  let areaName = "";
  let inputRef;

  const handleAdd = (event) => {
    event.preventDefault();
    if (!areaName) return alert("please fill in name");
    if ($areas?.length >= MAX_AREA_COUNT) return alert("you cannot create a new area");
    const newIndex = $areas ? $areas.length + 1 : 1;
    const newArea: IArea = {
      id: uuid(),
      order: newIndex,
      name: areaName,
    };
    $areas = $areas ? $areas.concat([newArea]) : [newArea];
    setTimeout(() => {
      areaName = null;
      if (inputRef) inputRef.focus();
    }, 100);
  };
  // $: console.log("area length", $areas?.length || 0);
</script>

<div>
  <form class="jd-form-set" on:submit={handleAdd}>
    <code class="jd-id">{createAreaJdId($areas?.length ? $areas.length + 1 : 1)}</code>
    <!-- input id attribute is only used for label relation, don't use for anything else. -->
    <label for="area-name-input">add new area</label>
    <input
      id="area-name-input"
      class="jd-text-input"
      type="text"
      placeholder="new area"
      autocomplete="off"
      bind:this={inputRef}
      bind:value={areaName}
    />
    <SubmitButton>add</SubmitButton>
  </form>
</div>

<!-- // -->
<style type="text/postcss">
  form {
    @apply h-8 relative;
  }
  div {
    @apply transform scale-125 w-64 md:w-full max-w-xs mx-auto;
  }
  .jd-text-input {
    padding-left: 3.5rem;
  }
  .jd-id {
    @apply absolute top-1 left-1 mt-0.5 text-xs;
  }
</style>
