import { UserSchedule } from '@models/schedules'
import { FC, ReactNode, createContext, useContext, useState } from 'react'

interface ScheduleProviderProps {
  schedule: UserSchedule
  handleSchedule: (schedule: UserSchedule) => void
}

const ScheduleContext = createContext<ScheduleProviderProps | null>(null)

export const useScheduler = () => useContext(ScheduleContext)

const ScheduleProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [schedule, setSchedule] = useState<any>()

  const handleSchedule = (schedule: UserSchedule) => {
    setSchedule(schedule)
  }

  return (
    <ScheduleContext.Provider value={{ schedule, handleSchedule }}>
      {' '}
      {children}
    </ScheduleContext.Provider>
  )
}

export default ScheduleProvider
