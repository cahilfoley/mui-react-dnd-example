export interface User {
  id: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
}

export interface Assignment {
  id: string;
  userID: string;
  assetID?: string;
}

export interface AssetWithUser extends Asset {
  user?: User;
}
