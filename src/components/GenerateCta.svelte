<script lang="typescript">
  import { areas } from "../stores";
  import { DialogOverlay } from "svelte-accessible-dialog";
  import GenerateContent from "./GenerateContent.svelte";

  // Generate Data dialog
  let isGenerateOpen;

  const openGenerate = () => {
    isGenerateOpen = true;
  };
  const closeGenerate = () => {
    isGenerateOpen = false;
  };
</script>

<div class="generate-container">
  {#if $areas?.length}<button class="jd-primary-button" on:click={openGenerate}>Generate</button>{/if}
</div>

<DialogOverlay isOpen={isGenerateOpen} onDismiss={closeGenerate}>
  <GenerateContent on:close={closeGenerate} />
</DialogOverlay>

<style type="text/postcss">
  .jd-primary-button {
    @apply text-3xl py-2 px-8;
    --jd-button-shadow: 4px;
  }
  .generate-container {
    @apply text-center pt-8 pb-4 mx-auto max-w-xl;
  }
</style>
