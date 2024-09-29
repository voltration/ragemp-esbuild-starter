import { add } from "./utils";

let state = false;

mp.keys.bind(0x71, true, () => {
    state = !state;
    mp.gui.cursor.show(state, state);
});

add(24, 43);
add(1, 1);