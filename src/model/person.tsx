import { Timestamp } from "../types"

export const Prefix = {
    mr: "mister_i18n",
    ms: "miss_i18n",
    mrs: "mrs_i18n"
}

export const Nationality = {
    th: "Thailand"
}

export enum GENDER {
    MALE,
    FEMALE,
    NON_BINARY
}

export type PrefixType = "mr" | "ms" | "mrs"

export type PersonFormModel = {
    id?: React.Key
    prefix?: PrefixType
    first_name?: string
    last_name?: string
    date_of_birth?: Timestamp
    nationality?: string
    national_id?: string
    gender?: GENDER
    phone_number?: string
    passport_id?: string
    expected_salary?: number
}