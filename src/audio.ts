import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus
} from "@discordjs/voice";

const { STREAM_URL } = process.env;

const newRadio = () => createAudioResource(STREAM_URL, { inlineVolume: true });

let audioResource = newRadio();
const audioPlayer = createAudioPlayer();

const playRadio = () => {
  audioResource = newRadio();
  audioPlayer.play(audioResource);
};

audioPlayer.on("stateChange", (_, newState) => {
  if (newState.status === AudioPlayerStatus.Idle) {
    playRadio();
  }
});

playRadio();

export { audioPlayer, audioResource };
