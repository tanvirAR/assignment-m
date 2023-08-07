export default interface channelInterface {
  label: string;
  value: string;
  type: number;
  guild: string;
  guildId: string;
  parentId: null | string;
  permissionOverwrites: string[];
  id: string;
  name: string;
  rawPosition: number;
  createdTimestamp: number;
  [key: string]: any;
}


