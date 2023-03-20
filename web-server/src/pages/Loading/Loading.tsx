import { CircularProgress } from "@mui/material";
import { Wrapper, LoadingTitle } from "./Loading.style";

const Loading = () => {
  return (
    <Wrapper>
      <CircularProgress
        sx={{
          color: "white",
          width: "75px !important",
          height: "80px !important",
        }}
      />
      <LoadingTitle>LOADING</LoadingTitle>
    </Wrapper>
  );
};

export default Loading;
