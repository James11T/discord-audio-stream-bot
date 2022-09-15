import { SlashCommandBuilder } from "@discordjs/builders";
import { audioPlayer } from "../audio";
import fs from "fs";
import { createAudioResource } from "@discordjs/voice";
import type { CommandInteraction } from "discord.js";

const command = new SlashCommandBuilder()
  .setName("playsound")
  .setDescription("Play a sound file from bot")
  .addStringOption((option) =>
    option
      .setName("filename")
      .setDescription("Filename of sound to play")
      .setRequired(true)
  ) as SlashCommandBuilder;

const handler = async (interaction: CommandInteraction) => {
  const file = interaction.options.get("filename")?.value;
  if (file === undefined) return;

  const fullName = `static/${file}`;
  const exists = fs.existsSync(fullName);

  const resource = createAudioResource(fullName);
  audioPlayer.play(resource);

  if (!exists) {
    await interaction.reply({
      content: "File does not exist",
      ephemeral: true
    });
    return;
  }

  await interaction.reply({
    content: `Playing \`${file}\``,
    ephemeral: false
  });
};

export { command, handler };
