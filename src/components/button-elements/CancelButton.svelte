<button on:click aria-label="cancel" type="button" {...$$restProps}><slot /></button>

<style type="text/postcss">
  button {
    @apply border-ejd-borderSubdued hover:border-ejd-border focus:border-ejd-border border rounded text-xs font-medium px-1 h-full ml-2 focus:outline-black;
  }
</style>
