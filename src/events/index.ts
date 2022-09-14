import interactionCreateHandler from "./interactionCreate";
import readyHandler from "./ready";
import type { Client } from "discord.js";

const registerEvents = (client: Client) => {
  client.once("ready", readyHandler);
  client.on("interactionCreate", interactionCreateHandler);
};

export { registerEvents };
