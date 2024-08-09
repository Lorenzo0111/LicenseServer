import type { License } from "database";
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  User,
} from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { fetcher } from "../lib/fetcher.js";
import { buildEmbed, error } from "../lib/embeds.js";

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
      required: false,
    })
    product: number | null,
    @SlashOption({
      name: "user",
      description: "The user to filter licenses by",
      type: ApplicationCommandOptionType.User,
      required: false,
    })
    user: User | null,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply();

    if (!product && !user) {
      await interaction.editReply(error("Please provide a product or user"));
      return;
    }

    let licenses: (License & {
      product: { name: string };
    })[] = [];

    if (product) {
      const { data } = await fetcher.get<
        (License & {
          product: { name: string };
        })[]
      >(`/api/products/${product}/licenses`);

      licenses = data;
    } else if (user) {
      try {
        const { data } = await fetcher.get<{
          licenses: (License & {
            product: { name: string };
          })[];
        }>(`/api/users/discord/${user.id}`);

        licenses = data.licenses;
      } catch (_) {}
    }

    await interaction.editReply(
      licenses.length === 0
        ? error("No license found")
        : {
            embeds: [
              buildEmbed().setFields(
                licenses.map((license) => ({
                  name: license.key,
                  value: `Product: \`${license.product.name}\``,
                }))
              ),
            ],
          }
    );
  }

  @Slash({ description: "Create a new license" })
  async create(
    @SlashOption({
      name: "product",
      description: "The ID of the product",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    })
    product: number,
    @SlashOption({
      name: "max-ips",
      description: "The maximum number of IPs",
      type: ApplicationCommandOptionType.Integer,
      required: true,
    })
    maxIps: number,
    @SlashOption({
      name: "user",
      description: "The owner of the license",
      type: ApplicationCommandOptionType.User,
    })
    user: User | null,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply({ ephemeral: true });
    let userId;

    if (user) {
      try {
        const { data } = await fetcher.get(`/api/users/discord/${user.id}`);
        userId = data.id;
      } catch (_) {}
    }

    try {
      const { data } = await fetcher.put<License>(
        `/api/products/${product}/licenses`,
        { maxIps, userId }
      );

      await interaction.editReply({
        embeds: [
          buildEmbed()
            .setTitle("License created")
            .setDescription(`> Key: \`${data.key}\``),
        ],
      });
    } catch (error) {
      await interaction.editReply("Failed to create license");
    }
  }
}
