module.exports = class Command {
  constructor(client, options) {
    this.client = client

    this.config = {
      name: options.name || null,
      aliases: options.aliases || [],
      category: options.category || "util",
      userPermission: options.userPermission || [],
      clientPermission: options.clientPermission || [],
      onlyDevs: options.onlyDevs || false
    }
  }
}