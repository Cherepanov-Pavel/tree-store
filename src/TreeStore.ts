interface TreeItem {
  id: number | string;
  parent: number | string;
  type?: any;
}

export class TreeStore {
  private itemsById: Map<TreeItem["id"], TreeItem> = new Map();
  private itemsByParentId: Map<TreeItem["parent"], TreeItem[]> = new Map();

  constructor(items: TreeItem[]) {
    items.forEach((item) => {
      this.itemsById.set(item.id, item);
      if (this.itemsByParentId.has(item.parent)) {
        this.itemsByParentId.get(item.parent).push(item);
      } else {
        this.itemsByParentId.set(item.parent, [item]);
      }
    });
  }

  getAll(): TreeItem[] {
    return Array.from(this.itemsById.values());
  }
  getItem(id: TreeItem["id"]): TreeItem | undefined {
    return this.itemsById.get(id);
  }
  getChildren(id: TreeItem["id"]): TreeItem[] {
    return this.itemsByParentId.get(id) ?? [];
  }
  getAllChildren(id: TreeItem["id"]): TreeItem[] {
    let children: TreeItem[] = this.getChildren(id);
    children.forEach((child) => {
      children.push(...this.getAllChildren(child.id));
    });
    return children;
  }
  getAllParents(id: TreeItem["id"]) {
    const result: TreeItem[] = [];

    let item = this.getItem(id);
    while (item.parent !== "root") {
      item = this.getItem(item.parent);
      result.push(item);
    }
    return result;
  }
}
