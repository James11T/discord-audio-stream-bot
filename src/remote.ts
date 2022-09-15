import axios from "axios";

const { STREAM_METADATA_URL } = process.env;

const getPlayerInfo = () => axios.get(STREAM_METADATA_URL);

const getNowPlaying = async (): Promise<string> => {
  const res = await getPlayerInfo();
  return res.data?.nowplaying ?? "Unknown";
};

const getListeners = async (): Promise<number> => {
  const res = await getPlayerInfo();
  if (res.data && res.data.connections) {
    return res.data.connections;
  }
  throw new Error("Invalid API response");
};

export { getNowPlaying, getListeners };
