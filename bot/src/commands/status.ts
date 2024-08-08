import { CommandInteraction } from "discord.js";
import { Discord, Slash } from "discordx";
import { fetcher } from "../lib/fetcher";

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
      content: `Bot status: online\nAPI status: ${apiStatus}`,
    });
  }
}
