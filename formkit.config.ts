import { defineFormKitConfig } from "@formkit/vue";
import { createProPlugin, rating, toggle, repeater } from "@formkit/pro";

// Create the Pro plugin with your `Project Key` and desired Pro Inputs:
const proPlugin = createProPlugin("fk-70fb9bf1f44", {
  // move to env
  rating,
  toggle,
  repeater,
  // any other Pro Inputs
});

export default defineFormKitConfig({
  plugins: [proPlugin],
});
