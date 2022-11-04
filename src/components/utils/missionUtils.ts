// import { getDataFromFile } from "./dataUtils";
import { Mission } from "../../types/mission";
import { Payload } from "../../types/payload";

export const getMissionsFromFile = async () => {
  try {
    const response = await fetch("http://localhost:8080/missions.json", {
      method: "GET",
    });
    const jsonResult = await response.json();
    const {
      data: { missions },
    } = jsonResult;
    return missions;
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const getMissionIdMap = (missions: Mission[]): Map<string, Mission> => {
  const missionIdMap = new Map<string, Mission>();
  missions.forEach((mission) => {
    missionIdMap.set(mission.id, mission);
  });
  return missionIdMap;
};

// This assumes it is possible for the nationality of a mission's payloads to differ
export const getMissionNationalities = (
  missions: Mission[]
): Map<string, Set<string>> => {
  const nationalityMissionMap = new Map<string, Set<string>>();
  missions.forEach((mission) => {
    const { payloads } = mission;
    let validPayloads: Payload[] = payloads.filter((payload) => {
      return payload !== null;
    });

    validPayloads.forEach((payload) => {
      const currentNatValue = nationalityMissionMap.get(payload.nationality);
      const currentNationalityMissionValues: Set<string> = currentNatValue
        ? currentNatValue
        : new Set<string>();

      currentNationalityMissionValues.add(mission.id);
      nationalityMissionMap.set(
        payload.nationality,
        currentNationalityMissionValues
      );
    });
  });
  return nationalityMissionMap;
};

export const getMissionPayloadTotal = (
  mission: Mission,
  nationality?: string
): number => {
  let payloads = mission.payloads.filter((payload) => {
    return payload != null;
  });
  let result = payloads.reduce(function (acc, payload) {
    return acc + payload.payload_mass_kg;
  }, 0);

  return result;
};

export const getMissionsPayloadTotal = (
  missions: Mission[],
  nationality?: string
): number => {
  let result = 0;
  missions.forEach((mission) => {
    result += getMissionPayloadTotal(mission);
  });

  return result;
};
