import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { GENDER, PersonFormModel, PrefixType } from "../../model/person";

const initialState: PersonFormModel = {
  prefix: undefined,
  first_name: undefined,
  last_name: undefined,
  date_of_birth: undefined,
  nationality: undefined,
  national_id: undefined,
  gender: undefined,
  phone_number: undefined,
  expected_salary: undefined,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPrefix: (state, action: PayloadAction<PrefixType>) => {
      state.prefix = action.payload;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.first_name = action.payload;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.last_name = action.payload;
    },
    setDOB: (state, action: PayloadAction<Date>) => {
      state.date_of_birth = action.payload;
    },
    setNationality: (state, action: PayloadAction<string>) => {
      state.nationality = action.payload;
    },
    setnationalId: (state, action: PayloadAction<string>) => {
      state.national_id = action.payload;
    },
    setGender: (state, action: PayloadAction<GENDER>) => {
      state.gender = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setExpectedSalary: (state, action: PayloadAction<number>) => {
      state.expected_salary = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPrefix,
  setFirstName,
  setLastName,
  setDOB,
  setNationality,
  setnationalId,
  setGender,
  setPhoneNumber,
  setExpectedSalary,
} = personSlice.actions;

export default personSlice.reducer;
