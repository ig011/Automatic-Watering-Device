import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import { getData } from "./api/helpers";
import { Wrapper } from "./App.styles";
import NavBar from "./components/Navbar/Navbar";
import TopBar from "./components/TopBar/TopBar";
import Loading from "./pages/Loading/Loading";
import { PageRoutes } from "./pages/routes/routes";
import { RootState } from "./store/store";

const POLLING_TIMEOUT = 5000;

const App = () => {
  const flower = useSelector((state: RootState) => state.awdDevice.data.flower);
  const pageElement = useRoutes(PageRoutes);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval(() => {
      getData(dispatch);
    }, POLLING_TIMEOUT);
  }, [dispatch]);

  if (!pageElement) return null;
  else if (!flower) return <Loading />;
  return (
    <>
      <TopBar />
      <Wrapper>
        <NavBar />
        {React.cloneElement(pageElement, { key: location.pathname })}
      </Wrapper>
    </>
  );
};

export default App;
