import { SlashCommandBuilder } from "@discordjs/builders";
import { getListeners } from "../remote";
import type { CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("listeners")
  .setDescription("Get how many people are listening to the stream");

const handler = async (interaction: CommandInteraction) => {
  const nowPlaying = await getListeners();

  await interaction.reply({
    content: `There are currently \`${nowPlaying}\` listeners`,
    ephemeral: false
  });
};

export { command, handler };
