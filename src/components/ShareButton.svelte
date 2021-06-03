<script lang="typescript">
  import { onMount } from "svelte";

  export let text = "";

  let shareSupported = false;
  let buttonRef;

  const title = "My Johnny•Decimal Index";

  const handleShare = () => {
    if (!shareSupported) return alert("share not supported");
    navigator
      .share({ title, text, url: window.location.href })
      .then(() => {
        buttonRef.blur();
      })
      .catch((err) => {
        console.error(`Couldn't share because of`, err.message);
      });
  };

  onMount(() => {
    if (navigator.share) {
      shareSupported = true;
    }
  });
  // $: {}
</script>

{#if shareSupported}
  <button class="jd-primary-button" on:click={handleShare} bind:this={buttonRef}>share</button>
{/if}

<style>
  button {
    @apply text-xl py-1 px-4 mb-6 bg-ejd-actionSecondary;
    --jd-button-shadow: 2px;
  }
</style>
