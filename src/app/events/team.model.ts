import { SSEvent } from "./event.model";
import { SSPlayer } from "./player.model";

export interface SSTeam {
  _id?: string,
  name: string,
  players: SSPlayer[]
  playDay: string,
  playTime: string,
  event: SSEvent,
  paid: boolean

}
