import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import { ISuperheroe } from "../../shared/model/superheroe.model";
import Superheroes from "../../services/superheroes.service";
import SuperheroeCard from "../../shared/components/SuperheroeCard";
import Detail from "../../shared/components/Detail";
import ErrorSnackbar from "../../shared/components/ErrorSnackbar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ISearchSuperheroes {
  open: boolean;
  handleClose: () => void;
}

export const SearchSuperheroes = (props: ISearchSuperheroes) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISuperheroe[] | null>(
    null
  );
  const [openSuperheroeDetail, setOpenSuperheroeDetail] = useState<boolean>(
    false
  );
  const [superheroDetail, setSuperheroDetail] = useState<ISuperheroe | null>(
    null
  );
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchHandler = () => {
    Superheroes.getArrayByName(searchValue).then((response) => {
      console.log(response);
      if (response.data.error) {
        setErrorMessage("No se encontraron superheroes con ese nombre");
        setOpenErrorSnackbar(true);
        setSearchResults(null);
      }

      setSearchResults(response.data.results);
    });
  };

  return (
    <Dialog
      open={props.open}
      fullScreen
      color="primary"
      TransitionComponent={Transition}
      onClose={props.handleClose}
    >
      <ErrorSnackbar
        openSnackbar={openErrorSnackbar}
        handleCloseSnackbar={() => setOpenErrorSnackbar(false)}
        errorMessage={errorMessage}
      />
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Agregar Superheroes
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ margin: "20px" }}>
        <div className="row" style={{ marginBottom: "20px" }}>
          <div className="col-auto my-auto">
            <TextField
              label="Nombre"
              value={searchValue}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(event.target.value)
              }
            />
          </div>
          <div className="col-auto my-auto">
            <Button
              endIcon={<SearchIcon />}
              variant="contained"
              color="secondary"
              style={{ marginLeft: "20px" }}
              onClick={searchHandler}
              disabled={searchValue.length === 0}
            >
              Buscar
            </Button>
          </div>
        </div>
        <div className="row g-0">
          <Detail
            superheroe={superheroDetail}
            open={openSuperheroeDetail}
            handleClose={() => setOpenSuperheroeDetail(false)}
          />
          <Grid container spacing={4}>
            {searchResults?.map((result: ISuperheroe, index: number) => (
              <Grid
                container
                item
                xs={6}
                sm={4}
                md={3}
                lg={2}
                xl={1}
                key={index}
              >
                <SuperheroeCard
                  action="addable"
                  superheroe={result}
                  cardClick={(superheroe: ISuperheroe) => {
                    setSuperheroDetail(superheroe);
                    setOpenSuperheroeDetail(true);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </Dialog>
  );
};
export default SearchSuperheroes;
