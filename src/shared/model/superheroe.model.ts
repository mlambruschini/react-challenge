import { IAppearance } from "./appearance.model";
import { IKey, IPowerstats } from "./powerstats.model";

export interface ISuperheroe extends IKey {
  appearance: IAppearance;
  biography: {
    aliases: string[];
    alignment: string;
    "alter-egos": string;
    "first-appearance": string;
    "full-name": string;
    "place-of-birth": string;
    publisher: string;
  };
  connections: {
    "group-affiliations": string;
    relatives: string;
  };
  id: string;
  image: {
    url: string;
  };
  name: string;
  powerstats: IPowerstats;
  work: {
    base: string;
    occupation: string;
  };
}
