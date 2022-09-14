import "dotenv/config";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource
} from "@discordjs/voice";

const { STATUS, STREAM, TOKEN, CHAT } = process.env;
if (!STREAM || !TOKEN || !CHAT) {
  console.error("Some required envrionment variables were not set.");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const getChannel = async (channel: string) => {
  const discordChannel = await client.channels.fetch(channel);
  return discordChannel;
};

client.on("ready", async () => {
  if (!client.user) return;

  console.log(`Ready as ${client.user.tag}`);

  if (STATUS) {
    client.user.setActivity(STATUS, {
      type: ActivityType.Listening
    });
  }

  const vc = await getChannel(CHAT);
  if (!vc || !vc.isVoiceBased()) {
    console.error("Failed to fetch voice channel with given ID");
    process.exit(1);
  }

  const con = joinVoiceChannel({
    channelId: vc.id,
    guildId: vc.guild.id,
    adapterCreator: vc.guild.voiceAdapterCreator
  });

  const res = createAudioResource(STREAM, { inlineVolume: true });
  res.volume?.setVolume(1);
  const player = createAudioPlayer();
  player.play(res);
  con.subscribe(player);
});

const start = async () => {
  client.login(TOKEN);
  console.log("Listening");
};

start();
