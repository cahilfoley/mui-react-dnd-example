import { useDrag } from "react-dnd";

import Card from "@mui/material/Card";

import { ItemType } from "./constants";
import { User } from "./types";

export interface UserCardProps {
  user: User;
  unassigned?: boolean;
}

export const UserCard = ({ user, unassigned }: UserCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: unassigned ? ItemType.UnassignedUser : ItemType.AssignedUser,
    item: user,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div ref={drag} style={{ opacity, cursor: "pointer" }}>
      <Card variant="outlined" sx={{ padding: 1 }}>
        {user.name}
      </Card>
    </div>
  );
};
