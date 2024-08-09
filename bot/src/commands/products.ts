import type { Product } from "database";
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup, SlashOption } from "discordx";
import { buildEmbed, error } from "../lib/embeds.js";
import { fetcher } from "../lib/fetcher.js";

@Discord()
@SlashGroup({ name: "products", description: "Manage products" })
@SlashGroup("products")
export class ProductsCommand {
  @Slash({ description: "List all prodcts" })
  async list(interaction: CommandInteraction) {
    await interaction.deferReply();

    const { data: products } = await fetcher.get<Product[]>("/api/products");

    await interaction.editReply(
      products.length === 0
        ? error("No product found")
        : {
            embeds: [
              buildEmbed().setFields(
                products.map((product) => ({
                  name: product.name,
                  value: `ID: \`${product.name}\``,
                }))
              ),
            ],
          }
    );
  }

  @Slash({ description: "Create a new product" })
  async create(
    @SlashOption({
      name: "name",
      description: "The name of the product",
      type: ApplicationCommandOptionType.String,
      required: true,
    })
    name: string,
    interaction: CommandInteraction
  ) {
    await interaction.deferReply({ ephemeral: true });

    try {
      const { data } = await fetcher.put<Product>("/api/products", { name });

      await interaction.editReply({
        embeds: [
          buildEmbed()
            .setTitle(`Product created`)
            .setDescription(`Name: ${data.name}\nID: \`${data.id}\``),
        ],
      });
    } catch (_) {
      await interaction.editReply(error("Failed to create product"));
    }
  }
}
