import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { ISuperheroe } from "../model/superheroe.model";

interface IDetail {
  open: boolean;
  handleClose: () => void;
  superheroe: ISuperheroe | null;
}
const Detail = (props: IDetail) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={props.superheroe?.image.url}
            style={{ marginRight: "20px" }}
          />
          Detalle
        </div>
      </DialogTitle>
      <DialogContent>
        <List dense={true}>
          <ListItem>
            <ListItemText>
              <b>Peso: </b>
              {props.superheroe?.appearance.weight[1]}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Altura: </b>
              {props.superheroe?.appearance.height[1]}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Nombre Completo: </b>
              {props.superheroe?.biography["full-name"]}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Alias: </b>
              {props.superheroe?.biography.aliases[0]}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Color de Ojos: </b>
              {props.superheroe?.appearance["eye-color"]}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Cabello: </b>
              {props.superheroe?.appearance["hair-color"]}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Lugar de trabajo: </b>
              {props.superheroe?.work.base}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <b>Orientación: </b>
              {props.superheroe?.biography.alignment}
            </ListItemText>
          </ListItem>
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};
export default Detail;
