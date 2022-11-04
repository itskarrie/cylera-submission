const enum Country {
  Thailand = "Thailand",
  Canada = "Canada",
  Japan = "Japan",
  Luxembourg = "Luxembourg",
  UnitedStates = "United States",
  HongKong = "Hong Kong",
}

export interface Payload {
  id: string;
  payload_mass_kg: number;
  nationality: Country;
}
