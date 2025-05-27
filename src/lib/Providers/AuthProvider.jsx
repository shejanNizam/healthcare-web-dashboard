import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useGetUserByTokenQuery } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/slices/authSlice";
import ThemeProvider from "./ThemeProvider";

export const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);

const socket = io(`${import.meta.env.VITE_IMAGE_URL}`, {
  transports: ["websocket"],
});

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socketLoading, setSocketLoading] = useState(false);
  const [socketState, setSocketState] = useState(null);
  const socketRef = useRef(null);

  const { data, isLoading } = useGetUserByTokenQuery();

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    // Avoid running without a valid token

    const socket = io(`${import.meta.env.VITE_IMAGE_URL}`, {
      transports: ["websocket"],
      auth: {
        token,
      },
    });

    if (!socket.connected) {
      socket.on("connect", () => {
        setSocketState(socket);
      });
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser({ user: data?.data || null }));
    }
  }, [data, isLoading, dispatch]);

  return (
    <ThemeProvider>
      <SocketContext.Provider value={{ socket: socketState, socketLoading }}>
        {children}
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

export default AuthProvider;
