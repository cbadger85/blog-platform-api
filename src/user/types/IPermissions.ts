export interface IPermissions {
  collections: ICollectionPermissions[];
  accessLevel: IPermisssionsAccessLevel[];
}

export interface ICollectionPermissions {
  id: string;
  accessLevel: ICollectionAccessLevel[];
}

export enum ICollectionAccessLevel {
  VIEW_COLLECTION = 'VIEW_COLLECTION',
  CREATE_POST = 'CREATE_POST',
  PUBLISH_OWN_POST = 'PUBLISH_OWN_POST',
  COLLECTION_EDITOR = 'EDITOR',
}

export enum IPermisssionsAccessLevel {
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  COLLECTIONS_EDITOR = 'COLLECTIONS_EDITOR',
  PAGES_EDITOR = 'PAGES_EDITOR',
}
