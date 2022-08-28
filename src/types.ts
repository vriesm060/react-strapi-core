export type Entity = {
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CollectionType = {
  type: string;
  entities: Entity[];
};