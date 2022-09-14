import type { Command } from "./types";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      STREAM_URL: string;
      STREAM_METADATA_URL: string;
      CHAT_ID: string;
      GUILD_ID: string;
      BOT_ID: string;
      STATUS: string | undefined;
    }
  }
  namespace DiscordJS {
    interface Client {
      commands: Record<string, Command>;
    }
  }
}

export {};
