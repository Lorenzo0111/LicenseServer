import { Colors, EmbedBuilder } from "discord.js";
import { bot } from "../main.js";

export function buildEmbed() {
  let color = bot.guilds.cache.first()?.members.me?.displayHexColor;
  if (!color || color === "#000000") color = "#e11d48";

  return new EmbedBuilder()
    .setFooter({
      text: bot.user?.username ?? "Licenses",
      iconURL: bot.user?.displayAvatarURL(),
    })
    .setColor(color)
    .setTimestamp();
}

export function error(message: string) {
  return {
    embeds: [
      buildEmbed()
        .setTitle("An error occurred!")
        .setDescription(`> ${message}`)
        .setColor(Colors.Red),
    ],
  };
}
