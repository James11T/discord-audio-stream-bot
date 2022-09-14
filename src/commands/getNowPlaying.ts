import { SlashCommandBuilder } from "@discordjs/builders";
import { getNowPlaying } from "../remote";
import type { CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("nowplaying")
  .setDescription("Get now playing from the bot");

const handler = async (interaction: CommandInteraction) => {
  const nowPlaying = await getNowPlaying();

  await interaction.reply({
    content: `Currently playing \`${nowPlaying}\``,
    ephemeral: false
  });
};

export { command, handler };
