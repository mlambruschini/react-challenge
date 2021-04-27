import { IKey } from "./powerstats.model";

export interface IAppearance extends IKey {
  "eye-color": string;
  gender: string;
  "hair-color": string;
  height: string[];
  race: string;
  weight: string[];
}
