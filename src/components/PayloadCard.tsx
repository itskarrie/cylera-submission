import React, { useState } from "react";
import { CyleraListbox, generateOptionsMap } from "./Listbox";
import usePromise from "react-promise";
import { Mission } from "../types/mission";
import {
  getMissionIdMap,
  getMissionNationalities,
  getMissionPayloadTotal,
} from "./utils/missionUtils";
import { Country } from "../types/payload";
import DoughnutChart from "./DoughnutChart";
import { PayloadCardTable } from "./PayloadCardTable";

export interface PayloadCardProps {
  title: string;
  missions: Promise<Mission[]>;
}

const PayloadCard: React.FC<PayloadCardProps> = ({
  title,
  missions,
}: PayloadCardProps) => {
  const { value, loading } = usePromise<Mission[]>(missions);
  const [filterFieldValue, setFilterFieldValue] = useState<Country | null>(
    null
  );
  if (loading || !value) return null;
  // If this is consistently not working, please make sure you are running 'http-server --cors'

  // If we want to filter by other fields, we could make this more reusable
  const nationalityMissionMap = getMissionNationalities(value);
  const missionNationalities = Array.from(
    nationalityMissionMap.keys()
  ) as string[];

  let filteredMissions = value;
  const missionIdMap = getMissionIdMap(value);

  if (filterFieldValue) {
    let filteredMissionsId = nationalityMissionMap.get(filterFieldValue);
    filteredMissions = [];
    filteredMissionsId?.forEach((id) => {
      const valueInMap = missionIdMap.get(id);
      if (valueInMap) {
        filteredMissions.push(valueInMap);
      }
    });
  }

  const handleNationalityOptionChange = (nationality: Country | null) => {
    setFilterFieldValue(nationality);
  };

  const allOptionsValue = "All Nations";
  const listboxOptions = generateOptionsMap(
    missionNationalities,
    true,
    allOptionsValue
  );

  return (
    <article className="bg-white rounded-lg md:max-h-85 h-85 md:w-137.5 shadow-md">
      <header className="flex space-x-8 py-2 px-6 justify-between items-center h-min">
        <h2 className="text-heading text-xl font-bold font-helveticaFamily w-96 h-7 truncate">
          {filterFieldValue ? ` ${title}` : `Total ${title}`}
        </h2>
        <div>
          <CyleraListbox
            options={listboxOptions}
            onChangeValue={handleNationalityOptionChange}
          ></CyleraListbox>
        </div>
      </header>
      <hr className="border-gray-50 border-2"></hr>
      <div className="flex flex-col items-center md:max-h-70 md:h-70 md:flex-row">
        <div className="w-44 p-4 md:mx-graphMargin">
          <DoughnutChart
            chartTitle="Mission Payloads"
            chartLabels={filteredMissions.map((mission) => {
              return mission.name;
            })}
            chartData={filteredMissions.map((mission) => {
              return getMissionPayloadTotal(mission);
            })}
            unit="KG"
          />
        </div>
        <div className="min-w-fit block overflow-y-auto overflow-x-hidden max-h-full md:self-start pr-6">
          <PayloadCardTable
            missions={filteredMissions}
            filterFieldValue={filterFieldValue}
            units="KG"
          />
        </div>
      </div>
    </article>
  );
};

export default PayloadCard;
