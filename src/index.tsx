import { createRoot } from "react-dom/client";

import { Application } from "./views/Application";

const mount = document.querySelector("#app");
if (mount === null) {
  throw new Error("no mount point located");
}

const root = createRoot(mount);
root.render(<Application />);
