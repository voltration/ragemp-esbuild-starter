mp.events.add("playerReady", (p: PlayerMp) => {
  p.notify(`Welcome, ${p.socialClub}.`);
});