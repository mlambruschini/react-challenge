import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { IRootState } from "../../shared/reducers";
import AddIcon from "@material-ui/icons/Add";
import SuperheroeCard from "../../shared/components/SuperheroeCard";
import SearchSuperheroes from "./searchSuperheroes";
import { ISuperheroe } from "../../shared/model/superheroe.model";
import Detail from "../../shared/components/Detail";
import { logout } from "../../shared/reducers/authentication";
import LogoutIcon from "@material-ui/icons/MeetingRoom";
import TeamPowerstats from "../../shared/components/teamPowerstats";

interface IHome extends StateProps, DispatchProps {}
const Home = (props: IHome) => {
  const { team } = props;

  const [openSearchSuperheroes, setOpenSearchSuperheroes] = useState<boolean>(
    false
  );
  const [superheroeDetail, setSuperheroeDetail] = useState<ISuperheroe | null>(
    null
  );
  const [openSuperheroeDetail, setOpenSuperheroeDetail] = useState<boolean>(
    false
  );

  return (
    <div style={{ marginLeft: "20px", marginRight: "20px" }}>
      <SearchSuperheroes
        open={openSearchSuperheroes}
        handleClose={() => setOpenSearchSuperheroes(false)}
      />
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="col-auto">
          <Typography variant="h3">Grupo seleccionado</Typography>
        </div>
        <div className="col my-auto row justify-content-between">
          <div className="col-auto">
            <Button
              onClick={() => setOpenSearchSuperheroes(true)}
              endIcon={<AddIcon />}
              variant="contained"
              color="primary"
            >
              agregar
            </Button>
          </div>
          <div className="col-auto">
            <Button
              onClick={() => props.logout()}
              endIcon={<LogoutIcon />}
              variant="contained"
              color="secondary"
            >
              cerrar sesión
            </Button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          {team.length === 0 ? (
            <Typography>
              Auxilio! No hay ningún superheroe en nuestro equipo!!
            </Typography>
          ) : (
            <Grid container spacing={4}>
              <Detail
                superheroe={superheroeDetail}
                open={openSuperheroeDetail}
                handleClose={() => setOpenSuperheroeDetail(false)}
              />
              {team?.map((result: ISuperheroe, index: number) => (
                <Grid container item xs={4} key={index}>
                  <SuperheroeCard
                    action="deleteable"
                    superheroe={result}
                    cardClick={(superheroe: ISuperheroe) => {
                      setSuperheroeDetail(superheroe);
                      setOpenSuperheroeDetail(true);
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
        {team.length !== 0 && (
          <div className="col-auto">
            <TeamPowerstats team={team} />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ superheroes }: IRootState) => ({
  team: superheroes.team,
});

const mapDispatchToProps = {
  logout,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
