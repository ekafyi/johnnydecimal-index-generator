<script lang="typescript">
  import { Draggable, CreateAreaContainer, GenerateCta, ResetButton, Footer } from "./components";

  let innerHeight;

  $: {
    if (innerHeight) document.body.style.minHeight = `${innerHeight}px`;
  }
</script>

<svelte:window bind:innerHeight />

<main>
  <CreateAreaContainer />
  <Draggable />
  <GenerateCta />
  <ResetButton />
</main>
<Footer />

<!-- // -->
<style global>
  /**== Element ID from svelte-dnd-action to customize "dragging" state ==*/
  #dnd-action-dragged-el .jd-actions {
    display: none;
  }

  /**== Area/Category/Thing ID and name, eg. "11 Invoices" ==*/
  .jd-id {
    @apply bg-ejd-surfaceHighlight text-ejd-textOnHighlight border-ejd-borderHighlight border rounded-sm leading-snug px-1 mr-0.5;
  }
  .jd-id-and-name {
    @apply flex items-center max-w-full;
  }
  .jd-id-and-name > .jd-name {
    @apply truncate;
  }
  .jd-id-and-name > .jd-id {
    @apply flex-none mr-2;
  }

  /**== Header and single item in a Category/Thing list ==*/
  .jd-header-in-list {
    @apply bg-ejd-surfaceSubdued border-ejd-border border-b-2 relative;
  }
  .jd-item-in-list {
    @apply bg-ejd-surface hover:bg-ejd-surfaceHover border-b;
  }

  /**== Common form components ==*/
  .jd-text-input {
    @apply bg-ejd-surface text-ejd-text font-medium text-sm px-2 shadow-inner w-full focus:outline-none;
  }
  .jd-text-input::placeholder {
    @apply text-ejd-textDisabled font-normal;
  }
  .jd-text-input:focus {
    @apply shadow-none;
  }
  .jd-form-set {
    @apply bg-ejd-borderSubdued border-ejd-borderSubdued hover:border-ejd-border border rounded shadow-sm flex justify-between;
  }
  .jd-form-set:focus-within {
    @apply bg-ejd-border border-ejd-border;
    box-shadow: 2px 2px 0 #111;
  }
  .jd-form-set .jd-text-input {
    @apply rounded-l;
  }
  .jd-form-set .jd-submit-button {
    @apply rounded-r;
  }
  .jd-form-set label[for] {
    @apply sr-only;
  }

  /**== Common action components ==*/
  .jd-inline-action {
    @apply text-ejd-text hover:bg-ejd-actionPrimaryHovered focus:bg-ejd-actionPrimaryHovered hover:border-ejd-border border-ejd-border border-b focus:outline-black font-medium;
  }
  .jd-inline-action:hover {
    border-bottom-width: 2px;
  }
  .jd-primary-button {
    @apply bg-ejd-actionPrimary text-ejd-textOnPrimary hover:bg-ejd-actionPrimaryHovered border-ejd-border border-2 rounded font-semibold font-display focus:outline-black;
    box-shadow: var(--jd-button-shadow) var(--jd-button-shadow) 0 #111;
  }
  .jd-icon-button {
    @apply bg-ejd-actionSecondary text-ejd-textOnSecondary focus:outline-black w-6 h-6 rounded-full flex items-center justify-center;
  }
  .jd-icon-button--standard {
    @apply hover:bg-ejd-text focus:bg-ejd-text hover:text-ejd-surface focus:text-ejd-surface;
  }
  .jd-icon-button--critical {
    @apply hover:bg-ejd-surfaceCritical focus:bg-ejd-surfaceCritical hover:text-ejd-textOnCritical focus:text-ejd-textOnCritical;
  }

  /* Outer component for Create Area/Category/Thing */
  .jd-create-container {
    @apply bg-ejd-actionSecondary text-ejd-text border-ejd-border border-dashed border-t px-2 py-3;
  }
  .jd-create-container .jd-count--show-on-focus {
    @apply opacity-0 h-0 sr-only;
    transition: all 0.2s ease-in-out;
  }
  .jd-create-container:focus-within .jd-count--show-on-focus {
    @apply opacity-100 h-3 mt-2 not-sr-only;
  }

  /**== Dialog components ==*/
  div[data-svelte-dialog-overlay] {
    @apply flex items-center justify-center;
    background-color: rgba(17, 24, 39, 0.5) !important;
    overflow: hidden !important;
  }
  div[data-svelte-dialog-content] {
    /* Configure width and height in more specific CSS classes. */
    @apply bg-ejd-surface border-ejd-border border-2 rounded focus:outline-black my-0 overflow-y-auto relative;
    box-shadow: 6px 6px 0 #111;
    padding: 0 !important;
    min-width: 22rem;
  }
  .jd-dialog-content--w-half {
    width: 50vw !important;
  }
  .jd-dialog-content--w-md {
    width: 28rem !important;
    max-width: calc(100vw - 2rem);
  }
  .jd-dialog-content--h-full {
    height: calc(100vh - 4rem);
  }
</style>
