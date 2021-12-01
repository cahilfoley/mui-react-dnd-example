import { useContext } from "react";
import { useDrop } from "react-dnd";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { ItemType } from "./constants";
import { AssignmentContext } from "./context";
import { User } from "./types";
import { UserCard } from "./UserCard";

const PaneWrapper = styled("div")`
  transition: ${({ theme }) => theme.transitions.create("background-color")};
  padding: ${({ theme }) => theme.spacing(2)};
  position: relative;
`;

export const UnassignedPane = () => {
  const { unassignedUsers, updateAssignment } = useContext(AssignmentContext);

  const [{ canDrop }, drop] = useDrop({
    accept: ItemType.AssignedUser,
    drop: (item: User) => {
      updateAssignment(item.id);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <PaneWrapper
      ref={drop}
      sx={{
        backgroundColor: canDrop ? "action.hover" : "background.default",
      }}
    >
      <Grid container spacing={2}>
        {unassignedUsers.map((user) => {
          return (
            <Grid key={user.id} item xs={12} sm={6}>
              <UserCard user={user} unassigned />
            </Grid>
          );
        })}
      </Grid>
    </PaneWrapper>
  );
};
