import { server } from "@shared/main"; 

/** Send a welcome message to the player */
mp.events.add("playerReady", (p: PlayerMp) => {
	p.notify(`Welcome to ${server.serverName}, ${p.socialClub}.`);
});
