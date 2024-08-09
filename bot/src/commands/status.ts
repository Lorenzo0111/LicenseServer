import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { buildEmbed } from "../lib/embeds.js";
import { fetcher } from "../lib/fetcher.js";

@Discord()
export class StatusCommand {
  @Slash({ description: "Get the bot and api status", name: "status" })
  async status(interaction: CommandInteraction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    const { data } = await fetcher.get("/api/status");
    const apiStatus = data.status;

    interaction.editReply({
      embeds: [
        buildEmbed().setDescription(
          `Bot status: online\nAPI status: ${apiStatus}`
        ),
      ],
    });
  }
}
