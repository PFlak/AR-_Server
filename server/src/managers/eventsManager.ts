import { Socket } from "socket.io";


export class EventsManager {

  static sendMessage(
    socket: Socket,
    messageName: string,
    data: Record<string,any>
  ): void {
    socket.emit(messageName, data);
  }
}
