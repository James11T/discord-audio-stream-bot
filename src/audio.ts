import {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  AudioResource
} from "@discordjs/voice";

const { STREAM_URL } = process.env;

const audioPlayer = createAudioPlayer();
let audioResource: AudioResource | undefined;

const playRadio = () => {
  audioResource = createAudioResource(STREAM_URL, { inlineVolume: true });
  audioPlayer.play(audioResource);
};

const setVolume = (volume: number) => {
  if (!audioResource || !audioResource.volume) return false;
  if (volume < 0) return false;
  audioResource.volume.setVolume(volume);
  return true;
};

audioPlayer.on("stateChange", (_, newState) => {
  if (newState.status === AudioPlayerStatus.Idle) {
    playRadio();
    console.log("Automatically restarted radio");
  }
});

export { audioPlayer, setVolume, playRadio };
