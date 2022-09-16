import bot from "..";
import { audioPlayer, playRadio } from "../audio";
import type { Client } from "discord.js";

const { STATUS, CHAT_ID } = process.env;

const handler = async (client: Client<true>) => {
  console.log(`Ready as ${client.user.tag}`);

  if (STATUS) {
    bot.setActivity(STATUS);
  }

  bot.playRadioIn(CHAT_ID);
};

export default handler;
