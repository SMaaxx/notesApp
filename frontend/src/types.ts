export type Note = {
  title: string,
  content: string,
  date: Date
  id: string
}

export type Day = {
  notes: Note[],
  day: {
    date: number
    month: string
    name: string,
    holiday: boolean
  }
}

export type Data = {
  [key: string]: Day
}

export interface DataState {
  data: Data;
}