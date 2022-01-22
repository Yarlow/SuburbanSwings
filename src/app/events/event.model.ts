import { SSLocation } from './location.model'

export interface SSEvent {
  _id?: string,
  name: string,
  location?: SSLocation,
  availableTimes: {
    Sunday: string[],
    Monday: string[],
    Tuesday: string[],
    Wednesday: string[],
    Thursday: string[],
    Friday: string[],
    Saturday: string[]
  },
  setup : {
    holesPlayed: 9,
    playersPerTeam: 2,
    maxTeams: 30
  },
  startDate: Date,
  endDate: Date,
  eventType: string,
  price: number

}
