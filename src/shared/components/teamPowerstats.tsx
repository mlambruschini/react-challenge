import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Typography,
} from "@material-ui/core";
import { IPowerstats } from "../model/powerstats.model";
import { ISuperheroe } from "../model/superheroe.model";
import { powerstatNameArray } from "./powerstatList";

const getSortedPowerstats = (powerstats: IPowerstats) => {
  const sortedPowerstats = Object.fromEntries(
    Object.entries(powerstats).sort(
      ([, a], [, b]) => parseInt(b, 10) - parseInt(a, 10)
    )
  );

  return sortedPowerstats;
};

const addPowerstats = (team: ISuperheroe[]) => {
  let totalPowerstats: IPowerstats = {
    combat: "0",
    durability: "0",
    intelligence: "0",
    power: "0",
    speed: "0",
    strength: "0",
  };
  team.forEach((member) =>
    powerstatNameArray.forEach(
      (statName) =>
        (totalPowerstats[statName] = (
          parseInt(member.powerstats[statName], 10) +
          parseInt(totalPowerstats[statName], 10)
        ).toString())
    )
  );

  return totalPowerstats;
};

const getAverageAppearance = (team: ISuperheroe[]) => {
  const teamSize = team.length;
  let averageAppearance: { [key: string]: number } = {
    weight: 0,
    height: 0,
  };

  team.forEach((member) =>
    Object.keys(averageAppearance).forEach((key: string) => {
      let value: string = member.appearance[key][1];
      value.slice(0, value.indexOf(" "));
      averageAppearance[key] += parseInt(value, 10) / teamSize;
    })
  );

  return averageAppearance;
};

const getUnits = (key: string) => {
  if (key === "weight") return "kg";
  if (key === "height") return "cm";
};

interface ITeamPowerstats {
  team: ISuperheroe[];
}
const TeamPowerstats = (props: ITeamPowerstats) => {
  const sortedPowerstats = getSortedPowerstats(addPowerstats(props.team));
  const averageAppearance = getAverageAppearance(props.team);

  return (
    <List dense={true}>
      <ListSubheader>
        <Typography variant="h5">Total</Typography>
      </ListSubheader>
      {Object.keys(sortedPowerstats).map((key: string) => (
        <ListItem>
          <ListItemText>
            <Typography>
              <b>{key}:</b> {sortedPowerstats[key]}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
      <ListSubheader style={{ marginTop: "20px" }}>
        <Typography variant="h5">Promedio</Typography>
      </ListSubheader>
      {Object.keys(averageAppearance).map((key: string) => (
        <ListItem>
          <ListItemText>
            <Typography>
              <b>{key}:</b> {Math.round(averageAppearance[key])} {getUnits(key)}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
export default TeamPowerstats;
