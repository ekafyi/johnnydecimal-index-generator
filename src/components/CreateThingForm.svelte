<script lang="typescript">
  import type { ICategory, IThing } from "types/jd";

  import uuid from "uuid-v4";
  import { createEventDispatcher } from "svelte";
  import { groupedThings } from "../stores";
  import { SubmitButton } from "./button-elements";

  export let categoryId: ICategory["id"];

  const dispatch = createEventDispatcher();

  let thingName = "";
  let inputRef;

  const handleAdd = () => {
    if (!thingName) return alert("please fill in name");
    if (!$groupedThings) $groupedThings = {};

    const newThing: IThing = {
      id: uuid(),
      order: $groupedThings[categoryId] ? $groupedThings[categoryId].length + 1 : 1, // new item = largest order number
      name: thingName,
      categoryId,
    };

    if ($groupedThings[categoryId]) {
      $groupedThings[categoryId] = $groupedThings[categoryId].concat([newThing]);
    } else {
      $groupedThings[categoryId] = [newThing];
    }

    thingName = null;
    if (inputRef) inputRef.focus();

    dispatch("created");
  };
</script>

<form class="jd-form-set" on:submit|preventDefault={handleAdd}>
  <!-- input id attribute is only used for label relation, don't use for anything else. -->
  <label for="thing-name-input">add new thing</label>
  <input
    id="thing-name-input"
    class="jd-text-input"
    type="text"
    placeholder="new thing"
    autocomplete="off"
    bind:this={inputRef}
    bind:value={thingName}
  />
  <SubmitButton>add</SubmitButton>
</form>

<style type="text/postcss">
  form {
    @apply h-8;
  }
</style>
