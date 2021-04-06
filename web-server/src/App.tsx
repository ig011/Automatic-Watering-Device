import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import NavBar from "./components/NavBar/NavBar";
import TopBar from "./components/TopBar/TopBar";
import {
  getDeviceChartData,
  getDeviceData,
} from "./features/awdDevice/awdDeviceSlice";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import { RootState } from "./store/store";

const Wrapper = styled.div`
  display: flex;
  padding: 0px;
`;

const Container = styled.div``;

const Loading = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  background-color: var(--color-background-topbar);
`;

const LoadingTitle = styled.label`
  font-size: 45px;
  font-weight: bold;
  text-shadow: 0 0 2px white;
  color: white;
`;

const App = () => {
  const id = useSelector((state: RootState) => state.awdDevice.data.device_id);
  const firmware = useSelector(
    (state: RootState) => state.awdDevice.data.firmware_version
  );
  const flower = useSelector((state: RootState) => state.awdDevice.data.flower);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeviceChartData());
    dispatch(getDeviceData());
    setInterval(() => {
      dispatch(getDeviceData());
      dispatch(getDeviceChartData());
    }, 10 * 1000);
  }, []);

  return (
    <>
      {!flower && (
        <Loading>
          <CircularProgress
            sx={{
              color: "white",
              width: "75px !important",
              height: "80px !important",
            }}
          />
          <LoadingTitle>LOADING</LoadingTitle>
        </Loading>
      )}
      <Container hidden={!flower}>
        <TopBar id={id} firmware={firmware} flower={flower} />
        <Wrapper>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Wrapper>
      </Container>
    </>
  );
};

export default App;
