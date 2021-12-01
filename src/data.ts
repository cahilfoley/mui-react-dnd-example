import { Asset, Assignment, User } from "./types";

export const users: User[] = [
  { id: "user-1", name: "Cahil" },
  { id: "user-2", name: "Chris" },
  { id: "user-3", name: "Precious" },
  { id: "user-4", name: "Brayden" },
  { id: "user-5", name: "Malek" },
];

export const assets: Asset[] = [
  { id: "asset-1", name: "Asset 1" },
  { id: "asset-2", name: "Asset 2" },
  { id: "asset-3", name: "Asset 3" },
  { id: "asset-4", name: "Asset 4" },
  { id: "asset-5", name: "Asset 5" },
];

export const assignments: Assignment[] = [
  { id: "assignment-1", userID: "user-1", assetID: "asset-1" },
  { id: "assignment-2", userID: "user-2", assetID: "asset-2" },
  { id: "assignment-3", userID: "user-3" },
  { id: "assignment-4", userID: "user-4" },
  { id: "assignment-5", userID: "user-5" },
];
