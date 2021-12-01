import { createContext, useMemo, useState } from "react";
import keyBy from "lodash/keyBy";

import * as defaultData from "./data";
import { AssetWithUser, Assignment, User } from "./types";

export interface AssignmentContextValue {
  assignments: Assignment[];
  unassignedUsers: User[];
  assetsWithUsers: AssetWithUser[];
  updateAssignment(userID: string, assetID?: string): void;
}

export const AssignmentContext = createContext<AssignmentContextValue>({
  assignments: [],
  unassignedUsers: [],
  assetsWithUsers: [],
  updateAssignment: () => undefined,
});

export const AssignmentProvider: React.FC = ({ children }) => {
  const [users] = useState(defaultData.users);
  const [assets] = useState(defaultData.assets);
  const [assignments, setAssignments] = useState(defaultData.assignments);

  const usersByID = useMemo(() => keyBy(users, "id"), [users]);
  const assignmentsByAssetID = useMemo(
    () => keyBy(assignments, "assetID"),
    [assignments]
  );
  const assignmentsByUserID = useMemo(
    () => keyBy(assignments, "userID"),
    [assignments]
  );

  const unassignedUsers = useMemo(
    () =>
      users.filter((user) => {
        const assignment = assignmentsByUserID[user.id];
        return !assignment?.assetID;
      }),
    [assignmentsByUserID, users]
  );

  const assetsWithUsers = useMemo(() => {
    return assets.map<AssetWithUser>((asset) => {
      const assignment = assignmentsByAssetID[asset.id];
      const user = usersByID[assignment?.userID];
      return { ...asset, user };
    });
  }, [assets, assignmentsByAssetID, usersByID]);

  const updateAssignment = (userID: string, assetID?: string) => {
    setAssignments((assignments) =>
      assignments.map((assignment) => {
        if (assignment.userID === userID) return { ...assignment, assetID };
        return assignment;
      })
    );
  };

  return (
    <AssignmentContext.Provider
      value={{
        assignments,
        unassignedUsers,
        assetsWithUsers,
        updateAssignment,
      }}
    >
      {children}
    </AssignmentContext.Provider>
  );
};
