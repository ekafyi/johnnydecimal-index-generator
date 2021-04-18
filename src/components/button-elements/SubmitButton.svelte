<button class="jd-submit-button" type="submit">
  <slot />
</button>

<style type="text/postcss">
  button {
    @apply bg-ejd-actionTertiary text-ejd-text hover:bg-ejd-text focus:bg-ejd-text hover:text-ejd-surface focus:text-ejd-surface font-semibold px-3 border-none focus:outline-black font-display;
  }
</style>
