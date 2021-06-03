<script lang="typescript">
  import { createEventDispatcher, onMount } from "svelte";
  import { DialogContent } from "svelte-accessible-dialog";
  import { ShareButton } from ".";
  import { CloseButton } from "./button-elements";
  import { stringifyAreas } from "../utils/jd-stringifier";
  import { areas } from "../stores";

  const TWITTER_SHARE_URL = "https://twitter.com/intent/tweet?text=Want%20to%20use%20the%20Johnny%20Decimal%20system%20but%20don't%20want%20to%20update%20the%20reordered%20index%20numbers%20manually%20when%20you%20change%20something?%20Use%20this%20generator:%20"; // prettier-ignore

  const DEFAULT_BUTTON_TEXT = "copy";
  const SUCCESS_BUTTON_TEXT = "copied! 👍🏽";

  let inputEl;
  let formattedText = "";
  let copyButtonText = DEFAULT_BUTTON_TEXT;

  const dispatch = createEventDispatcher();
  const handleClose = () => { dispatch("close") }; // prettier-ignore

  const handleCopy = () => {
    inputEl.select();
    document.execCommand("copy");
    copyButtonText = SUCCESS_BUTTON_TEXT;
    setTimeout(() => {
      copyButtonText = DEFAULT_BUTTON_TEXT;
    }, 1000);
  };

  onMount(() => {
    formattedText = stringifyAreas($areas);
  });

  // $: {}
</script>

<DialogContent class="jd-dialog-content--w-half jd-generated-detail" aria-label="Things editor">
  <div class="generated-header">
    <strong>🗂 &nbsp;Your J.D Index is ready</strong>
    <CloseButton on:click={handleClose} />
  </div>
  <div class="generated-body">
    <textarea rows={10} bind:value={formattedText} bind:this={inputEl} />
    <div class="generated-actions">
      <button class="jd-primary-button" class:success={copyButtonText === SUCCESS_BUTTON_TEXT} on:click={handleCopy}>
        {copyButtonText}
      </button>
      <ShareButton text={formattedText} />
      <p class="share-cta">
        Finding this app helpful?
        <a class="jd-inline-action" rel="external" href={TWITTER_SHARE_URL}>Tweet about it.</a>
      </p>
    </div>
  </div>
</DialogContent>

<style type="text/postcss">
  :global(.jd-generated-detail) {
    @apply flex flex-col;
    height: 66vh;
    min-height: 30rem;
  }
  textarea {
    @apply bg-ejd-surfaceHover block w-full rounded-md border border-transparent focus:border-ejd-borderSubdued focus:ring focus:outline-none font-mono text-sm px-2 py-2 shadow-inner focus:shadow-md;
  }
  .generated-header {
    @apply relative p-4;
  }
  .generated-body {
    @apply p-4 flex-1 grid;
    grid-template-rows: 1fr auto;
  }
  .generated-actions {
    @apply mt-4 text-center;
  }
  .jd-primary-button {
    @apply text-xl py-1 px-4 mb-6;
    --jd-button-shadow: 2px;
  }
  .jd-primary-button.success {
    @apply bg-green-200 hover:bg-green-200 focus:bg-green-200 cursor-default;
  }
  .share-cta {
    @apply text-xs text-gray-700;
  }
</style>
