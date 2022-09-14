import { commandCollection } from "../commands";
import type { Interaction } from "discord.js";

const handler = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  const command = commandCollection.get(commandName);

  if (!command) return;

  try {
    await command.handler(interaction);
  } catch (error) {
    await interaction.reply({
      content: "An error occurred and your request could not be processed.",
      ephemeral: true
    });
  }
};

export default handler;
