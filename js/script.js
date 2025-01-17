document.addEventListener("DOMContentLoaded", () => {
    const config = {
        serverInfo: {
            serverLogoImageFileName: "logo.png",
            serverName: "Drakula Mc",
            serverIp: "play.crystalnetwork.fun",
            discordServerID: "1229059598980354048", 
        },
    };

    const serverName = document.querySelector(".server-name");
    const serverLogo = document.querySelector(".logo-img");
    const serverIp = document.querySelector(".minecraft-server-ip");
    const discordOnlineUsers = document.querySelector(".discord-online-users");
    const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");

    const getDiscordOnlineUsers = async () => {
        const apiWidgetUrl = `https://discord.com/api/guilds/${config.serverInfo.discordServerID}/widget.json`;
        try {
            const response = await fetch(apiWidgetUrl);
            if (!response.ok) {
                console.error(`Discord API Error: ${response.statusText}`);
                return "API Error";
            }
            const data = await response.json();
            return data.presence_count || "None";
        } catch (e) {
            console.error("Error fetching Discord data:", e);
            return "Error";
        }
    };

    const getMinecraftOnlinePlayer = async () => {
        const apiUrl = `https://api.mcsrvstat.us/2/${config.serverInfo.serverIp}`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                console.error(`Minecraft API Error: ${response.statusText}`);
                return "API Error";
            }
            const data = await response.json();
            return data.players?.online || "None";
        } catch (e) {
            console.error("Error fetching Minecraft data:", e);
            return "Error";
        }
    };

    const updateStatus = async () => {
        if (discordOnlineUsers) discordOnlineUsers.textContent = "Loading...";
        if (minecraftOnlinePlayers) minecraftOnlinePlayers.textContent = "Loading...";

        const discordUsers = await getDiscordOnlineUsers();
        const minecraftPlayers = await getMinecraftOnlinePlayer();

        if (discordOnlineUsers) discordOnlineUsers.textContent = discordUsers;
        if (minecraftOnlinePlayers) minecraftOnlinePlayers.textContent = minecraftPlayers;
    };

    const initialize = async () => {
        if (serverName) serverName.textContent = config.serverInfo.serverName;
        if (serverLogo) serverLogo.src = `images/${config.serverInfo.serverLogoImageFileName}`;
        if (serverIp) serverIp.textContent = config.serverInfo.serverIp;

        await updateStatus();
    };

    initialize().catch((e) => console.error("Error during initialization:", e));
});
