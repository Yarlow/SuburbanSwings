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
  setupAndRules : {
    holesPerRound: number,
    playersPerTeam: number,
    maxTeams: number
  },
  startDate: Date,
  endDate: Date,
  eventType: string,
  price: number,
  summaryText: string,
  image: string

}
