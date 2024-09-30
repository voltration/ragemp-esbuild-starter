/** Send a welcome message to the player */
mp.events.add("playerReady", (p: PlayerMp) => {
  p.notify(`Welcome, ${p.socialClub}.`);
});