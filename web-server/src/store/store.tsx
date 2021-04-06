import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "../api/rootSaga";
import awdDeviceSlice from "../features/awdDevice/awdDeviceSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    awdDevice: awdDeviceSlice,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
