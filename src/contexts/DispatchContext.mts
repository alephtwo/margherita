import { createContext, Dispatch } from "react";

import { Message } from "../state/Message.mts";

// oxlint-disable-next-line unicorn/no-null
export const DispatchContext = createContext<Dispatch<Message> | null>(null);
