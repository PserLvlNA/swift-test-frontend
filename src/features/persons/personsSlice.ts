import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { format, parseISO } from "date-fns";

import { GENDER, PersonFormModel, PrefixType } from "../../model/person";

export interface PersonState {
  persons: PersonFormModel[];
  currentPerson?: PersonFormModel;
}
const initialState: PersonState = {
  persons: [],
};


export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    submitPerson: (state, action: PayloadAction<PersonFormModel>) => {
      state.persons.push(action.payload);
    },
    editPerson: (
      state,
      action: PayloadAction<{ id: string; values: PersonFormModel }>
    ) => {
      const findIndex = state.persons.findIndex(
        (i) => i.id == action.payload.id
      );
      if (findIndex > -1) state.persons[findIndex] = action.payload.values;
    },
    deletePerson: (state, action: PayloadAction<string>) => {
      const findIndex = state.persons.findIndex((i) => i.id == action.payload);
      if (findIndex > -1) state.persons.splice(findIndex, 1);
    },
    deleteSelect: (state, action: PayloadAction<string[]>) => {
      action.payload.map((id: string) => {
        const findIndex = state.persons.findIndex((i) => i.id == id);
        if (findIndex > -1) state.persons.splice(findIndex, 1);
      });
    },
    setCurrentPerson: (state, action: PayloadAction<string>) => {
      const findPerson = state.persons.find((i) => i.id == action.payload);
      const date = parseISO(String(findPerson?.date_of_birth))
      console.log(date)
      if (findPerson !== undefined) state.currentPerson = findPerson 
      // {
      //   id: findPerson.id,
      //   date_of_birth: date,
      //   prefix: findPerson.prefix,
      //   first_name: findPerson.first_name,
      //   last_name: findPerson.last_name,
      //   nationality: findPerson.nationality,
      //   national_id: findPerson.national_id,
      //   gender: findPerson.gender,
      //   passport_id: findPerson.passport_id,
      //   expected_salary: findPerson.expected_salary
      // };
    },
    clearCurrentPerson: (state) => {
      state.currentPerson = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  submitPerson,
  editPerson,
  deletePerson,
  deleteSelect,
  setCurrentPerson,
  clearCurrentPerson,
} = personSlice.actions;

export default personSlice.reducer;
