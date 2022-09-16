import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import { registerEvents } from "./events";
import type { VoiceBasedChannel } from "discord.js";
import { audioPlayer, playRadio } from "./audio";

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

  async playRadioIn(channel: string | VoiceBasedChannel) {
    let vc: VoiceBasedChannel;

    if (typeof channel === "string") {
      const fetchVc = await this.getChannelByID(channel);
      if (!fetchVc || !fetchVc.isVoiceBased()) {
        throw Error("Failed to fetch voice channel with given ID");
      }
      vc = fetchVc;
    } else {
      vc = channel;
    }

    const con = this.joinVoiceChannel(vc);
    con.subscribe(audioPlayer);
    playRadio();
  }

  async getMemberVoiceChannel(guildId: string, memberId: string) {
    const guild = this.client.guilds.cache.get(guildId);
    if (!guild) return null;
    const member = guild.members.cache.get(memberId);
    if (!member) return null;
    const voiceChannel = member.voice.channel;
    return voiceChannel;
  }
}

export default MusicBot;
