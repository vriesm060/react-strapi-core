export type Entity = {
  type: string;
  id: number | null;
};

export type CollectionType = {
  type: string;
  entities: Entity[];
};