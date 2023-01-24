export interface Appointment {
    treatment: number
    hairdresser: {
        id: number
        name: string
    }
    date: string
    time: {
        start_time: string
        end_time: string
    }
    personalData: {
        name: string
        email: string
        phone_number: string | undefined
        note: string | undefined
    }
}
