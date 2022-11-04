import { Payload } from "./payload";

interface Missions {
  data: string;
}

interface Mission {
  id: string;
  name: string;
  payloads: Payload[];
}
