interface Missions {
  data: string;
}

interface Mission {
  id: string;
  name: string;
  payloads: Payload[];
}

const enum Country {
  Thailand = "Thailand",
  Canada = "Canada",
  Japan = "Japan",
  Luxembourg = "Luxembourg",
  UnitedStates = "United States",
  HongKong = "Hong Kong",
}

interface Payload {
  id: string;
  payload_mass_kg: number;
  nationality: Country;
}
