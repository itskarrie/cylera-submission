import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";

export interface SortSymbolProps {
  sortDirection: SortDirection;
}

export enum SortDirection {
  None,
  Descending,
  Ascending,
}

export const SortSymbol: React.FC<SortSymbolProps> = ({
  sortDirection,
}: SortSymbolProps) => {
  if (sortDirection == SortDirection.None) {
    return null;
  }

  return (
    <span>
      {sortDirection == SortDirection.Ascending ? (
        <ArrowDownIcon className="h-3 w-3 text-gray-700 inline stroke-2" />
      ) : (
        <ArrowUpIcon className="h-3 w-3 text-gray-700 inline stroke-2" />
      )}
    </span>
  );
};
