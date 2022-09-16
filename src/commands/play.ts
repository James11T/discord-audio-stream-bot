import { SlashCommandBuilder } from "@discordjs/builders";
import type { CommandInteraction } from "discord.js";
import bot from "..";

const command = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Plays the radio in the users voice chat");

const handler = async (interaction: CommandInteraction) => {
  const error = async (text?: string) => {
    await interaction.reply({
      content: text ?? "Failed to play radio",
      ephemeral: true
    });
  };
  if (!interaction.inGuild()) return error("Must be used in a guild");
  const vc = await bot.getMemberVoiceChannel(
    interaction.guildId,
    interaction.user.id
  );
  if (!vc)
    return error("Failed to join Voice Channel, make sure you are in one");
  await bot.playRadioIn(vc);

  await interaction.reply({
    content: `Playing radio in \`${vc.name}\``,
    ephemeral: false
  });
};

export { command, handler };
