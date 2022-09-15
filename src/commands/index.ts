import * as NowPlaying from "./getNowPlaying";
import * as SetVolume from "./setVolume";
import * as GetListeners from "./getListeners";
import * as PlaySound from "./playSound";
import { Collection } from "discord.js";
import { Routes } from "discord-api-types/v9";
import { REST } from "@discordjs/rest";
import type { Command } from "../types";

const { GUILD_ID, TOKEN, BOT_ID } = process.env;

const rest = new REST({ version: "9" }).setToken(TOKEN);

const commands = [NowPlaying, SetVolume, GetListeners, PlaySound];
const commandCollection = new Collection<string, Command>();
commands.forEach((cmd) => commandCollection.set(cmd.command.name, cmd));

const deployCommands = async () => {
  console.log("Deploying commands");
  const body = commands.map((cmd) => cmd.command.toJSON());
  const res = await rest.put(
    Routes.applicationGuildCommands(BOT_ID, GUILD_ID),
    {
      body
    }
  );

  const count = Array.isArray(res) ? res.length : "unknown";

  console.log(`Deployed \`${count}\` commands`);
};

export { deployCommands, commands, commandCollection };
