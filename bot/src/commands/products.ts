import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashGroup } from "discordx";
import { fetcher } from "../lib/fetcher.js";
import type { Product } from "database";

@Discord()
@SlashGroup({ name: "products", description: "Manage products" })
@SlashGroup("products")
export class ProductsCommand {
  @Slash({ description: "List all prodcts" })
  async list(interaction: CommandInteraction) {
    await interaction.deferReply();

    const { data } = await fetcher.get<Product[]>("/api/products");
    const products = data.map((product) => `${product.id} - ${product.name}`);
    await interaction.editReply(
      products.length === 0 ? "No products found" : products.join("\n")
    );
  }
}
