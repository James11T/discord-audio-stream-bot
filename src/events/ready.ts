import bot from "..";
import { audioPlayer } from "../audio";
import type { Client } from "discord.js";

const { STATUS, CHAT_ID } = process.env;

const handler = async (client: Client<true>) => {
  console.log(`Ready as ${client.user.tag}`);

  if (STATUS) {
    bot.setActivity(STATUS);
  }

  const vc = await bot.getChannelByID(CHAT_ID);
  if (!vc || !vc.isVoiceBased()) {
    console.error("Failed to fetch voice channel with given ID");
    process.exit(1);
  }

  const con = bot.joinVoiceChannel(vc);
  con.subscribe(audioPlayer);
};

export default handler;
