<script>
  import { CreateAreaForm } from ".";
  import { areas } from "../stores";
  import { MAX_AREA_COUNT } from "../data/constants";

  const MAXED_TEXT = "You already have 9 areas. Click an area name to show delete option.";
  const BLURB_TEXT_1 = "Create and reorder your ";
  const BLURB_TEXT_2 = " items";
  const BLURB_TEXT_3 = "and generate a shareable, saveable index";
  const JD_URL = "https://johnnydecimal.com/";

  // $: {}
</script>

<div class="area-form-container" class:is-empty={!$areas || !$areas.length}>
  {#if $areas && $areas.length >= MAX_AREA_COUNT}
    <p class="no">{MAXED_TEXT}</p>
  {:else}
    {#if !$areas || !$areas.length}
      <div class="blurb">
        {BLURB_TEXT_1}
        <a class="jd-inline-action" href={JD_URL} rel="external">Johnny•Decimal</a>
        {BLURB_TEXT_2}<br />
        {BLURB_TEXT_3}
      </div>
    {/if}
    <CreateAreaForm />
  {/if}
</div>

<style type="text/postcss">
  .area-form-container {
    @apply mx-auto my-8 max-w-xl;
  }
  .area-form-container.is-empty {
    @apply flex flex-col justify-center;
  }
  .no {
    @apply text-center p-2 text-sm rounded bg-yellow-100 text-yellow-900;
  }
  .blurb {
    @apply text-center text-lg md:text-2xl pt-0 pb-8 font-display lg:mt-12;
  }
</style>
