import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import { registerEvents } from "./events";
import type { VoiceBasedChannel } from "discord.js";

class MusicBot {
  client: Client;

  constructor() {
    this.client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
    });

    registerEvents(this.client);
  }

  async getChannelByID(channel: string) {
    return await this.client.channels.fetch(channel);
  }

  setActivity(activity: string) {
    if (!this.client.isReady()) return;
    this.client.user.setActivity(activity, {
      type: ActivityType.Listening
    });
  }

  joinVoiceChannel(channel: VoiceBasedChannel) {
    return joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });
  }

  login(token: string) {
    this.client.login(token);
  }
}

export default MusicBot;
