import { ForwardedRef, forwardRef, useContext } from "react";
import { useDrop } from "react-dnd";

import Card, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { ItemType } from "./constants";
import { Asset, AssetWithUser, User } from "./types";
import { UserCard } from "./UserCard";
import { AssignmentContext } from "./context";

const CardAdapter = forwardRef(
  (
    { highlight, ...props }: CardProps & { highlight: boolean },
    ref: ForwardedRef<HTMLDivElement>
  ) => <Card {...props} ref={ref} />
);

const DropCard = styled(CardAdapter)`
  padding: ${({ theme }) => theme.spacing(1)};
  background: ${({ theme, highlight }) =>
    highlight ? theme.palette.action.hover : theme.palette.background.default};
  transition: ${({ theme }) =>
    theme.transitions.create(["background", "opacity"])};
`;

interface EmptyCardProps {
  asset: Asset;
}

const EmptyCard = ({ asset }: EmptyCardProps) => {
  const { updateAssignment } = useContext(AssignmentContext);

  const [{ canDrop }, drop] = useDrop({
    accept: [ItemType.UnassignedUser, ItemType.AssignedUser],
    drop: (item: User) => {
      updateAssignment(item.id, asset.id);
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const opacity = canDrop ? 1 : 0.5;

  return (
    <DropCard
      ref={drop}
      highlight={canDrop}
      variant="outlined"
      sx={{ padding: 1, opacity }}
    >
      Empty
    </DropCard>
  );
};

export interface AssetAssignmentCardProps {
  asset: AssetWithUser;
}

export const AssetAssignmentCard = ({ asset }: AssetAssignmentCardProps) => {
  return (
    <div>
      <Card sx={{ padding: 1, minWidth: 150 }}>
        <Typography>{asset.name}</Typography>
        {asset.user ? (
          <UserCard user={asset.user} />
        ) : (
          <EmptyCard asset={asset} />
        )}
      </Card>
    </div>
  );
};
