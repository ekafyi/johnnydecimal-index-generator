export interface IJdBase {
  /** Unique uuid4 */
  id: string;
  /** User defined name */
  name: string;
  /** Order index used to create readable identifier. Modifiable by user. */
  order: number;
  /** Readable identifier in J.D format, eg. "10-19" for Area */
  jdReadableId?: string;
}

export interface IArea extends IJdBase {}

export interface ICategory extends IJdBase {
  areaId: IArea["id"];
}

export interface IThing extends IJdBase {
  categoryId: ICategory["id"];
}

export interface IAreaWithItems extends IArea {
  items?: ICategory[];
}

export interface IGroupedCategory {
  /** List of Categories grouped by parent Area id as property key */
  [key: string]: ICategory[];
}

export interface IGroupedThing {
  /** List of Things grouped by parent Category id as property key */
  [key: string]: IThing[];
}
