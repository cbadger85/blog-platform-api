export interface Permissions {
  collections: CollectionPermissions[];
  accessLevel: PermisssionsAccessLevel[];
}

export interface CollectionPermissions {
  id: string;
  accessLevel: CollectionAccessLevel[];
}

export enum CollectionAccessLevel {
  VIEW_COLLECTION = 'VIEW_COLLECTION',
  CREATE_POST = 'CREATE_POST',
  PUBLISH_OWN_POST = 'PUBLISH_OWN_POST',
  COLLECTION_EDITOR = 'EDITOR',
}

export enum PermisssionsAccessLevel {
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  COLLECTIONS_EDITOR = 'COLLECTIONS_EDITOR',
  PAGES_EDITOR = 'PAGES_EDITOR',
}
