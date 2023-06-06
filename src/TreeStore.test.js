import { describe, expect, it } from "vitest";
import { TreeStore } from "./TreeStore.ts";

describe("TreeStore class basic tests", () => {
  const items = [
    { id: "10", parent: 8, type: null },
    { id: 9, parent: 4, type: null },
    { id: 1, parent: "root" },
    { id: 2, parent: 1, type: "test" },
    { id: 3, parent: 1, type: "test" },

    { id: 4, parent: 2, type: "test" },
    { id: 5, parent: 2, type: "test" },
    { id: 6, parent: 2, type: "test" },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
  ];
  const ts = new TreeStore(items);

  it.concurrent("getAll", () => {
    expect(ts.getAll()).toEqual(items);
  });
  it.concurrent("getItem", () => {
    expect(ts.getItem(1)).toEqual(items.find((item) => item.id === 1));
    expect(ts.getItem(2)).toEqual(items.find((item) => item.id === 2));
    expect(ts.getItem("10")).toEqual(items.find((item) => item.id === "10"));
  });
  it.concurrent("getChildren", () => {
    expect(ts.getChildren(1)).toEqual(
      items.filter((item) => item.parent === 1)
    );
    expect(ts.getChildren(2)).toEqual(
      items.filter((item) => item.parent === 2)
    );
    expect(ts.getChildren(8)).toEqual(
      items.filter((item) => item.parent === 8)
    );
  });
  it.concurrent("getAllChildren", () => {
    expect(ts.getAllChildren(1)).toEqual([
      { id: 2, parent: 1, type: "test" },
      { id: 3, parent: 1, type: "test" },
      { id: 4, parent: 2, type: "test" },
      { id: 5, parent: 2, type: "test" },
      { id: 6, parent: 2, type: "test" },
      { id: 9, parent: 4, type: null },
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
      { id: "10", parent: 8, type: null },
    ]);
  });
  it.concurrent("getAllParents", () => {
    expect(ts.getAllParents(1)).toEqual([]);
    expect(ts.getAllParents(8)).toEqual([
      { id: 4, parent: 2, type: "test" },
      { id: 2, parent: 1, type: "test" },
      { id: 1, parent: "root" },
    ]);
  });
});
