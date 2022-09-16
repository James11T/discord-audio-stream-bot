import "dotenv/config";
import MusicBot from "./bot";
import { assertNonNullable } from "./utils";

const { NODE_ENV } = process.env;

assertNonNullable<string>("STREAM_URL", process.env.STREAM_URL);
assertNonNullable<string>(
  "STREAM_METADATA_URL",
  process.env.STREAM_METADATA_URL
);
assertNonNullable<string>("TOKEN", process.env.TOKEN);
assertNonNullable<string>("CHAT_ID", process.env.CHAT_ID);
assertNonNullable<string>("GUILD_ID", process.env.GUILD_ID);
assertNonNullable<string>("BOT_ID", process.env.BOT_ID);

const { TOKEN } = process.env;

const bot = new MusicBot();

const start = async () => {
  bot.login(TOKEN);
};

if (!NODE_ENV || NODE_ENV.toUpperCase() !== "DEPLOY") {
  start();
}

export default bot;
