import { Hash } from 'crypto'

interface WeekDay {
    monday: string
    thuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
}

interface Availability {
    unavailable_times: WeekDay
    available_times: WeekDay
}

export interface Hairdresser {
    name: string
    email: string
    password: Hash
    availability: Availability
}
