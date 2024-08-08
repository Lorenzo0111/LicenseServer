import type { License } from "database";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { fetcher } from "../lib/fetcher.js";

@Discord()
@SlashGroup({ name: "licenses", description: "Manage licenses" })
@SlashGroup("licenses")
export class LicensesCommand {
  @Slash({ description: "List all licenses" })
  async list(
    @SlashOption({
      name: "product",
      description: "The ID of the product",
      type: ApplicationCommandOptionType.Integer,
    })
    product: number,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply();

    const { data } = await fetcher.get<License[]>(
      `/api/products/${product}/licenses`
    );
    const licenses = data.map(
      (license) => `${license.key} - ${license.maxIps}`
    );
    await interaction.editReply(
      licenses.length === 0 ? "No products found" : licenses.join("\n")
    );
  }

  @Slash({ description: "Create a new license" })
  async create(
    @SlashOption({
      name: "product",
      description: "The ID of the product",
      type: ApplicationCommandOptionType.Integer,
    })
    product: number,
    @SlashOption({
      name: "max-ips",
      description: "The maximum number of IPs",
      type: ApplicationCommandOptionType.Integer,
    })
    maxIps: number,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply({ ephemeral: true });

    try {
      await fetcher.put(`/api/products/${product}/licenses`, { maxIps });

      await interaction.editReply("License created successfully");
    } catch (error) {
      await interaction.editReply("Failed to create license");
      return;
    }
  }
}
