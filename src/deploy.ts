import "dotenv/config";
import { deployCommands } from "./commands";

/*
 npm run deploy
 
 Used to push command metadata up to discord API
*/

deployCommands();

process.exit(0);
