import { mount } from "svelte";

import Margherita from "./view/Margherita.svelte";

const element = document.querySelector("#app");
if (element === null) {
  throw new Error("Unable to find root mount");
}

export default mount(Margherita, { target: element });
