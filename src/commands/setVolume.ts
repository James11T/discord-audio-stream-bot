import { SlashCommandBuilder } from "@discordjs/builders";
import { audioResource } from "../audio";
import type { CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("volume")
  .setDescription("Set the music volume")
  .addNumberOption((option) =>
    option
      .setName("volume")
      .setDescription("The volume of the music")
      .setMinValue(0)
      .setRequired(true)
  ) as SlashCommandBuilder;

const handler = async (interaction: CommandInteraction) => {
  const volume = interaction.options.get("volume")?.value;
  if (volume === undefined || !audioResource.volume) return;

  audioResource.volume.setVolume(Number(volume));

  await interaction.reply({
    content: `Set volume to \`${volume}\``,
    ephemeral: false
  });
};

export { command, handler };
