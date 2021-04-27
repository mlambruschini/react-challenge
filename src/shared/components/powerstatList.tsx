import { LinearProgress, List, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { IPowerstats } from "../model/powerstats.model";

export const powerstatNameArray = [
  "combat",
  "durability",
  "intelligence",
  "power",
  "speed",
  "strength",
];

interface IPowerstatList {
  powerstats: IPowerstats;
}
const PowerstatList = (props: IPowerstatList) => {
  return (
    <List dense={true}>
      {Object.keys(props.powerstats).map((key: string, index: number) => (
        <Fragment key={index}>
          <Typography>{key}</Typography>
          <LinearProgress
            variant="determinate"
            value={parseInt(props.powerstats[key], 10)}
            color="primary"
            style={{ marginBottom: "10px" }}
          />
        </Fragment>
      ))}
    </List>
  );
};
export default PowerstatList;
