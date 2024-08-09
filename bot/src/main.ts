import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { ActivityType, IntentsBitField } from "discord.js";
import { Client } from "discordx";
import * as logger from "./lib/logger.js";
import chalk from "chalk";

const timestamp = Date.now();

export const bot = new Client({
  botGuilds: process.env.ALLOWED_GUILDS?.split(",") ?? [],
  intents: [IntentsBitField.Flags.Guilds],
  silent: process.env.NODE_ENV === "production",
  presence: {
    activities: [
      {
        name: "licenses",
        type: ActivityType.Watching,
      },
    ],
  },
  logger: {
    error(...args) {
      logger.error(args.join(" "));
    },
    info(...args) {
      logger.info(args.join(" "));
    },
    log(...args) {
      logger.info(args.join(" "));
    },
    warn(...args) {
      logger.warn(args.join(" "));
    },
  },
});

bot.once("ready", () => {
  void bot.initApplicationCommands();

  logger.info(
    `Bot started in ${chalk.bgYellow(` ${Date.now() - timestamp} ms `)}`
  );
});

bot.on("interactionCreate", (interaction: Interaction) => {
  bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
  void bot.executeCommand(message);
});

async function run() {
  await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);

  if (!process.env.BOT_TOKEN) {
    throw Error("Could not find BOT_TOKEN in your environment");
  }

  await bot.login(process.env.BOT_TOKEN);
}

void run();
