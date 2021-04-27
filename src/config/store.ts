import { createStore } from "redux";
import reducer, { IRootState } from "../shared/reducers";

const initialize = (initialState?: IRootState) =>
  createStore(reducer, initialState);

export default initialize;
