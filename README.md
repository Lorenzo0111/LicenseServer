# License Server

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/Lorenzo0111/LicenseServer)](https://github.com/Lorenzo0111/LicenseServer/releases/latest)
[![GitHub License](https://img.shields.io/github/license/Lorenzo0111/LicenseServer)](LICENSE)
[![Discord](https://img.shields.io/discord/1088775598337433662)](https://discord.gg/HT47UQXBqG)

  <hr />

<a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FLicenseServer&env=DATABASE_URL,AUTH_SECRET,AUTH_DISCORD_ID,AUTH_DISCORD_SECRET,BACKEND_SECRET,ENABLE_EXPERIMENTAL_COREPACK&envDescription=All%20the%20Environment%20Variables%20needed%20for%20the%20app%20to%20work&envLink=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FLicenseServer%3Ftab%3Dreadme-ov-file%23deploying&project-name=license-server&repository-name=LicenseServer&redirect-url=https%3A%2F%2Fgithub.com%2FLorenzo0111%2FLicenseServer"><img src="https://vercel.com/button" alt="Deploy with Vercel" height="32" /></a>

</div>

## What is License Server

License Server is an easy to use system that allows you to create a simple license system for your projects to protect your code from unauthorized access.

<img src="https://github.com/Lorenzo0111/LicenseServer/blob/main/media/Dashboard.png?raw=true" height="400" />

## Deploying

You'll have to set the following environment variables to setup the dashboard, here is a list of them:

> ✨ You can generate secret tokens by visiting [this link](https://generate-secret.vercel.app/32)

### Dashboard Environment Variables

| Key                 | Description                     | Example       |
| ------------------- | ------------------------------- | ------------- |
| DATABASE_URL        | The postgres url                | postgresql:// |
| AUTH_SECRET         | The auth secret                 |               |
| AUTH_DISCORD_ID     | Your discord client id          |               |
| AUTH_DISCORD_SECRET | Your discord client secret      |               |
| BACKEND_SECRET      | Backend secret used for the bot |               |

> 🚨 You must also set `ENABLE_EXPERIMENTAL_COREPACK` to `1` to enable the corepack support if using Vercel.

### Bot Environment Variables

| Key            | Description                     | Example                |
| -------------- | ------------------------------- | ---------------------- |
| BACKEND_SECRET | Backend secret used for the bot |                        |
| ALLOWED_GUILDS | CSV for guilds id               | 1088775598337433662,.. |
| BOT_TOKEN      | The bot token                   |                        |

### Serverless

You can deploy the project to Vercel or any other hosting service by clicking the buttons above.

### Selfhosting

If you want to selfhost, you can run `yarn`, `yarn build` and `yarn start` to start the program.

The dashboard will usually be available [here](http://localhost:3000/).

### Adding an admin

You must be an admin to access the dashboard. You can use the CLI for that. Here are the steps:

- Create an account on the dashboard
- Set the same .env variables on your local environment
- Run `yarn install`
- Run `yarn cli users:list` to see the list of users
- Run `yarn cli admins:add <id>` to add your user as admin

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you need help, feel free to join the [Discord Server](https://discord.gg/HT47UQXBqG) or open an issue.
