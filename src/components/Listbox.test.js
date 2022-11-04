import { expect, test } from "@jest/globals";
import { generateOptionsMap } from "./Listbox";

test("generateOptionsMap only returns options map", () => {
  const options = ["Taylor", "Swift"];
  const result = generateOptionsMap(options);
  const expected = new Map();
  expected.set("Taylor", "Taylor");
  expected.set("Swift", "Swift");
  expect(result).toEqual(expected);
});

test("generateOptionsMap returns options map and 'all' option", () => {
  const options = ["Taylor", "Swift"];
  const result = generateOptionsMap(options, true);
  const expected = new Map();
  expected.set("Taylor", "Taylor");
  expected.set("Swift", "Swift");
  expected.set("All", null);
  expect(result).toEqual(expected);
});
