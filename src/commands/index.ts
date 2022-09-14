import * as NowPlaying from "./getNowPlaying";
import * as SetVolume from "./setVolume";
import * as GetListeners from "./getListeners";
import { Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import type { Command } from "../types";

const { GUILD_ID, TOKEN, BOT_ID } = process.env;

const rest = new REST({ version: "9" }).setToken(TOKEN);

const commands = [NowPlaying, SetVolume, GetListeners];
const commandCollection = new Collection<string, Command>();
commands.forEach((cmd) => commandCollection.set(cmd.command.name, cmd));

const deployCommands = async () => {
  console.log("Deploying commands");
  rest
    .put(Routes.applicationGuildCommands(BOT_ID, GUILD_ID), {
      body: commands.map((cmd) => cmd.command.toJSON())
    })
    .catch(console.error);
  console.log(`Deployed ${commands.length} commands`);
};

export { deployCommands, commands, commandCollection };