let state = false;

/** Toggle cursor with F2 key */
mp.keys.bind(0x71, true, () => {
	state = !state;
	mp.gui.cursor.show(state, state);
});