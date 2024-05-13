import { Socket } from "socket.io";

export const setupCompetitionSocketConncetion = (socket: Socket) => {

    const roomID = socket.handshake.query.roomID as string;

    // const userID = socket.data.handshake.extraParsedData.userData.userName;

    // setupConnectionClientToRoom(socket, roomID, userID);

    setupSocketListners(socket, roomID);
};

export const setupSocketListners = (socket: Socket, roomID: string) => {

    socket.on("handleConnection", () => { });

    socket.on("handleClientResponse", () => { });

    socket.on("disconnect", handleClientDisconnect);
}

export const setupConnectionClientToRoom = (socket: Socket, roomID: string, userID: string) => {



    socket.join(roomID);
};


const handleClientDisconnect = function(this: Socket) {

    const connectionData = this.data.handshake.extraParsedData.userData;
    
    const roomID = this.handshake.query.roomID as string;
  
    const userID = connectionData.userName;
  }