import { io } from "socket.io-client";

let socket;

export const initializeSocketConnection = () => {
    if (!socket) {
        socket = io("http://localhost:3000", {
            withCredentials: true,
        })

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server")
        })

        socket.on("connect_error", (err) => {
            console.error("Socket.IO connection error", err)
        })
    }

    return socket
}

export const sendMessage = (message) => {
    if (!socket) return
    socket.emit("chat:message", message)
}

export const subscribeToMessages = (callback) => {
    if (!socket) return
    socket.on("chat:message", callback)
}
