<button on:click aria-label="close" type="button" {...$$restProps}>
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    />
  </svg>
</button>

<style type="text/postcss">
  button {
    @apply w-5 h-5 focus:outline-black absolute right-4 top-1/2;
    transform: translateY(-50%);
  }
</style>
