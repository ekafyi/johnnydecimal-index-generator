<script lang="typescript">
  import type { ICategory, IArea } from "types/jd";

  import uuid from "uuid-v4";
  import { createEventDispatcher } from "svelte";
  import { groupedCategories } from "../stores";
  import { SubmitButton } from "./button-elements";
  import { MAX_CATEGORY_COUNT } from "../data/constants";

  export let areaId: IArea["id"];

  let categoryName = "";
  let inputRef;

  const dispatch = createEventDispatcher();

  const handleAdd = (event) => {
    event.preventDefault();
    if (!categoryName) return alert("please fill in name");
    if (!$groupedCategories) $groupedCategories = {};
    if ($groupedCategories[areaId] && $groupedCategories[areaId]?.length >= MAX_CATEGORY_COUNT)
      return alert("you cannot create a new category");

    const newCategory: ICategory = {
      id: uuid(),
      order: $groupedCategories[areaId] ? $groupedCategories[areaId].length + 1 : 1, // new item = largest order number
      name: categoryName,
      areaId,
    };

    if ($groupedCategories[areaId]) {
      $groupedCategories[areaId] = $groupedCategories[areaId].concat([newCategory]);
    } else {
      $groupedCategories[areaId] = [newCategory];
    }

    categoryName = null;
    if (inputRef) inputRef.focus();

    dispatch("created", { areaId });
  };
</script>

<form class="jd-form-set" on:submit={handleAdd}>
  <!-- input id attribute is only used for label relation, don't use for anything else. -->
  <label for="cat-name-input">add new category</label>
  <input
    id="cat-name-input"
    class="jd-text-input"
    type="text"
    placeholder="new category"
    autocomplete="off"
    bind:this={inputRef}
    bind:value={categoryName}
  />
  <SubmitButton>add</SubmitButton>
</form>

<style type="text/postcss">
  form {
    @apply h-8;
  }
</style>
