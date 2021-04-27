import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { ISuperheroe } from "../model/superheroe.model";
import { IRootState } from "../reducers";
import PowerstatList from "./powerstatList";
import { addHeroe, removeHeroe } from "../reducers/superheroes.reducer";
import { connect } from "react-redux";
import SuccessSnackbar from "./SuccessSnackbar";
import ErrorSnackbar from "./ErrorSnackbar";

interface ISuperheroeCard extends StateProps, DispatchProps {
  superheroe: ISuperheroe;
  action: "deleteable" | "addable";
  cardClick: (result: ISuperheroe) => void;
}

const useStyles = makeStyles({
  media: {
    height: 350,
  },
});

const SuperheroeCard = (props: ISuperheroeCard) => {
  const classes = useStyles();
  const { team } = props;
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(
    false
  );

  let backgroundColor = null;
  if (props.superheroe.biography.alignment === "good") {
    backgroundColor = "#cce0cc";
  }

  if (props.superheroe.biography.alignment === "bad") {
    backgroundColor = "#ff9999";
  }

  const removeHandler = () => {
    props.removeHeroe(props.superheroe, team);
  };

  const addHandler = () => {
    if (team.includes(props.superheroe)) {
      setOpenErrorSnackbar(true);
      setErrorMessage("Este superheroe ya esta incluido en el equipo");
      return;
    }

    if (team.length === 6) {
      setOpenErrorSnackbar(true);
      setErrorMessage("El equipo ya está completo!");
      return;
    }

    if (
      props.superheroe.biography.alignment === "good" &&
      team.filter((member) => member.biography.alignment === "good").length ===
        3
    ) {
      setOpenErrorSnackbar(true);
      setErrorMessage("Ya hay 3 miembros con orientación buena en el equipo");
      return;
    }

    if (
      props.superheroe.biography.alignment === "bad" &&
      team.filter((member) => member.biography.alignment === "bad").length === 3
    ) {
      setOpenErrorSnackbar(true);
      setErrorMessage("Ya hay 3 miembros con orientación mala en el equipo");
      return;
    }

    setOpenSuccessSnackbar(true);
    props.addHeroe(props.superheroe, team);
  };

  return (
    <Card
      onClick={() => props.cardClick(props.superheroe)}
      style={backgroundColor ? { backgroundColor: backgroundColor } : {}}
    >
      <SuccessSnackbar
        openSnackbar={openSuccessSnackbar}
        handleCloseSnackbar={() => setOpenSuccessSnackbar(false)}
      />
      <ErrorSnackbar
        openSnackbar={openErrorSnackbar}
        handleCloseSnackbar={() => setOpenErrorSnackbar(false)}
        errorMessage={errorMessage}
      />
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          image={props.superheroe.image.url}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.superheroe.name}
          </Typography>
          <PowerstatList powerstats={props.superheroe.powerstats} />
        </CardContent>
        <CardActions>
          {props.action === "deleteable" ? (
            <Button
              size="small"
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                removeHandler();
              }}
            >
              Eliminar
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                addHandler();
              }}
            >
              Agregar
            </Button>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

const mapStateToProps = ({ superheroes }: IRootState) => ({
  team: superheroes.team,
});

const mapDispatchToProps = {
  addHeroe,
  removeHeroe,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(SuperheroeCard);
