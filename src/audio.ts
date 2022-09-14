import { createAudioPlayer, createAudioResource } from "@discordjs/voice";

const { STREAM_URL } = process.env;

const audioResource = createAudioResource(STREAM_URL, { inlineVolume: true });
const audioPlayer = createAudioPlayer();

audioPlayer.play(audioResource);

export { audioPlayer, audioResource };
