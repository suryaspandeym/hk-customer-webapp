import { type SyntheticEvent } from "react";

export const disableUpdateOnScroll = (e: SyntheticEvent) => {
    (e.currentTarget as HTMLInputElement).blur();
};
