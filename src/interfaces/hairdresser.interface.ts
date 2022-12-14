export interface StartEndTime {
    start_time: string
    end_time: string
    pauses: StartEndTime[] | any
}
export interface Availability {
    0?: StartEndTime
    1?: StartEndTime
    2?: StartEndTime
    3?: StartEndTime
    4?: StartEndTime
    5?: StartEndTime
    6?: StartEndTime
}

export interface Hairdresser {
    name: string
    email: string
    password: string
    availability: Availability
}
