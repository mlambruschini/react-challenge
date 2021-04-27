import { ISuperheroe } from "../model/superheroe.model";
export const ACTION_TYPES = {
  ADD: "superheroes/ADD",
  REMOVE: "superheroes/REMOVE",
};

const initialState = {
  team: [] as ISuperheroe[],
};

export type SuperheroesState = Readonly<typeof initialState>;

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state: SuperheroesState = initialState,
  action: any
): SuperheroesState => {
  switch (action.type) {
    case ACTION_TYPES.ADD:
    case ACTION_TYPES.REMOVE:
      return { ...state, team: action.payload };
    default:
      return state;
  }
};

export const addHeroe = (superheroe: ISuperheroe, team: ISuperheroe[]) => {
  const updatedTeam = [...team];
  updatedTeam.push(superheroe);
  return {
    type: ACTION_TYPES.ADD,
    payload: updatedTeam,
  };
};

export const removeHeroe = (superheroe: ISuperheroe, team: ISuperheroe[]) => {
  const updatedTeam = [...team];
  const position = updatedTeam.findIndex(
    (teamMember) => teamMember === superheroe
  );
  updatedTeam.splice(position, 1);
  return {
    type: ACTION_TYPES.REMOVE,
    payload: updatedTeam,
  };
};
