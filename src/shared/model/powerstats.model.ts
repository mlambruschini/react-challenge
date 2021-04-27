export interface IKey {
  [key: string]: any;
}

export interface IPowerstats extends IKey {
  combat: string;
  durability: string;
  intelligence: string;
  power: string;
  speed: string;
  strength: string;
}
