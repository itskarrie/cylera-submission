import React, { useState } from "react";
import { Mission } from "../types/mission";
import { Country } from "../types/payload";
import { SortSymbol, SortDirection } from "./SortSymbol";
import { getTailwindClassNames } from "./utils/chartUtils";
import { getMissionPayloadTotal } from "./utils/missionUtils";

export interface PayloadCardTableProps {
  missions: Mission[];
  filterFieldValue: string | null;
  units: string;
}

export interface PayloadCardTableDatum {
  // it would be nice to make this more generic
  mission: Mission;
  value: number;
  chartColor?: string | null;
}

export const PayloadCardTable: React.FC<PayloadCardTableProps> = ({
  missions,
  filterFieldValue,
  units,
}: PayloadCardTableProps) => {
  const [sortDirection, setSortDirection] = useState<SortDirection>(0);

  const getNextState = () => {
    const sortDirectionCount = Object.keys(SortDirection).length / 2;
    setSortDirection(
      ((sortDirection + 1) % sortDirectionCount) as SortDirection
    );
  };

  let payloadSortText = "Sort Total Payload Mass (descending)";
  if (sortDirection) {
    payloadSortText =
      sortDirection == SortDirection.Descending
        ? "Sort Total Payload Mass (ascending)"
        : "Remove Total Payload Mass";
    missions.sort((prev, next) => {
      const multiplier = sortDirection == SortDirection.Ascending ? 1 : -1;
      return (
        (getMissionPayloadTotal(prev) - getMissionPayloadTotal(next)) *
        multiplier
      );
    });
  }

  const colorsCssName = getTailwindClassNames();

  return (
    <table className="w-max border-collapse md:h-fit">
      <thead>
        <tr className="pb-2 md:pt-6 px-0">
          <th className="uppercase text-start pb-2 leading-6 w-40 md:w-36 text-xs md:pt-6">
            <div className="w-28 md:max-w-26 truncate">Mission</div>
          </th>
          <th className="uppercase leading-6 text-xs">
            <button
              className="uppercase relative text-start pb-2 leading-6 text-xs w-36 md:pt-6 overflow-visible z-0"
              onClick={getNextState}
              aria-label={payloadSortText}
            >
              Total Payload Mass
              <div className="absolute left-36 top-6">
                <SortSymbol sortDirection={sortDirection} />
              </div>
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {missions
          ? missions.map((mission, index) => {
              const bgColor = colorsCssName[index];
              return (
                <tr
                  key={`mission-${index}`}
                  className="border-ghostWhite border-b-2 py-2 leading-6 md:max-h-8 last:border-b-0"
                >
                  <td className="font-helveticaFamily text-jungleGreen w-40 md:w-36  py-2 text-sm leading-6 max-h-4  align-middle px-0">
                    <div className="w-28 md:max-w-26 truncate">
                      <span
                        className={`${bgColor} h-2 w-2 rounded-full mr-2 inline-block`}
                        aria-hidden
                      ></span>
                      <span>{mission.name}</span>
                    </div>
                  </td>
                  <td className="font-helveticaFamily text-jungleGreen text-opacity-50 text-ellipsis text-sm py-2 leading-6 md:max-h-4 px-0  w-36">
                    {getMissionPayloadTotal(
                      mission,
                      filterFieldValue as Country
                    )}{" "}
                    {units}
                  </td>
                </tr>
              );
            })
          : null}
      </tbody>
    </table>
  );
};
