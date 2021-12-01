import { styled } from "@mui/material/styles";
import { AssignmentPane } from "./AssignmentPane";
import { UnassignedPane } from "./UnassignedPane";
import { AssignmentProvider } from "./context";

const PageWrapper = styled("div")`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 75% 25%;
`;

function App() {
  return (
    <AssignmentProvider>
      <PageWrapper>
        <AssignmentPane />
        <UnassignedPane />
      </PageWrapper>
    </AssignmentProvider>
  );
}

export default App;
