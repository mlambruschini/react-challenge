import { combineReducers } from "redux";
import authentication, { AuthenticationState } from "./authentication";
import superheroes, { SuperheroesState } from "./superheroes.reducer";

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly superheroes: SuperheroesState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  superheroes,
});
export default rootReducer;
