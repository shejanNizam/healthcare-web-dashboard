import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useGetUserByTokenQuery } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/slices/authSlice";
import ThemeProvider from "./ThemeProvider";
// import { useDispatch } from "react-redux";
// import { useGetUserByTokenQuery } from "../../redux/features/Users/userApi";
// import { setUser } from "../../redux/features/Auth/authSlice";

export const SocketContext = createContext({});

export const useSocket = () => useContext(SocketContext);
// const AuthProvider = ({ children }) => {
//   //   const dispatch = useDispatch();
//   //   const { data, isLoading, error } = useGetUserByTokenQuery();

//   //   useEffect(() => {
//   //     if (!isLoading && data) {
//   //       dispatch(
//   //         setUser({
//   //           user: data?.data || null,
//   //         })
//   //       );
//   //     }
//   //   }, [data, isLoading]);

//   // Add loading and error UI logic when implementing the query
//   // if (isLoading) return <LoadingSpinner />;
//   // if (error) return <ErrorMessage />;

//   return <ThemeProvider>{children}</ThemeProvider>;
// };

// export default AuthProvider;

const socket = io(`${import.meta.env.VITE_IMAGE_URL}`, {
  transports: ["websocket"],
});
console.log("sosfdoifh", socket, "socket from auth provider--------->");

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socketLoading, setSocketLoading] = useState(false);
  const [socketState, setSocketState] = useState(null);
  const socketRef = useRef(null);
  //const { user, token } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserByTokenQuery();
  // Get token from localStorage
  // Connect using the auth option

  // console.log(data, isLoading);

  useEffect(() => {
    const token = localStorage.getItem("token") || null;
    // Avoid running without a valid token

    const socket = io(`${import.meta.env.VITE_IMAGE_URL}`, {
      transports: ["websocket"],
      auth: {
        token, // Token sent via the auth object
      },
    });
    // debugger
    // console.log(socket, "socket from auth provider--------->", token);
    if (!socket.connected) {
      socket.on("connect", () => {
        // console.log(socket, "Socket connected---------->");
        // socketRef.current = socket;
        setSocketState(socket);
      });
    }
  }, []);
  // console.log(socketRef.current, "socket----------")

  //   useEffect(() => {

  //     setSocketLoading(true);

  //     // Disconnect previous socket if it exists
  //     if (socketRef.current) {
  //       socketRef.current.close();
  //     }

  //     socket.on("connect", () => {
  //       setSocketLoading(false);
  //       socketRef.current = socket;
  //      // console.log(socket, "Socket connected---------->");
  //       //console.log("Socket connected---------->");
  //     });
  // //console.log(socket,"socket--------->", );
  //     socket.on("notification", (data) => {
  //       console.log("Notification received from auth provider:", data);
  //       if (data) {
  //         dispatch(setNotification(data));
  //       }
  //     });

  //     socket.on("connect_error", (err) => {
  //       setSocketLoading(false);
  //       console.error("Connection error:", err);
  //     });

  //     // Cleanup on unmount
  //     return () => {
  //       socket.close();
  //     };
  //   }, [ dispatch]);

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
