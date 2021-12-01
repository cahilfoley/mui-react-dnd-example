import { useContext } from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import { AssetAssignmentCard } from "./AssetAssignmentCard";
import { AssignmentContext } from "./context";

const PaneWrapper = styled("div")`
  border: 2px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  padding: ${({ theme }) => theme.spacing(2)};
  position: relative;
`;

export const AssignmentPane = () => {
  const { assetsWithUsers } = useContext(AssignmentContext);

  return (
    <PaneWrapper>
      <Grid container spacing={2} wrap="wrap">
        {assetsWithUsers.map((asset) => {
          return (
            <Grid key={asset.id} item>
              <AssetAssignmentCard asset={asset} />
            </Grid>
          );
        })}
      </Grid>
    </PaneWrapper>
  );
};
