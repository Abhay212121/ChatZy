import { io } from "socket.io-client";
import { serverAddress } from "./constants/serverAddress";

export const socket = io(`${serverAddress}`)