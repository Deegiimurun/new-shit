import {useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import {Theme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useDispatch, useSelector} from 'react-redux'
import {useSettings} from 'src/@core/hooks/useSettings'
import {RootState, AppDispatch} from 'src/store'
import {CalendarColors, CalendarFiltersType} from 'src/types/apps/calendarTypes'
import Calendar from 'src/views/apps/calendar/Calendar'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import AddEventSidebar from 'src/views/apps/calendar/AddEventSidebar'
import {
  addEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  handleSelectEvent,
} from '../../store/apps/calendar'

// ** CalendarColors
const calendarsColor: CalendarColors = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const AppCalendar = () => {
  // ** States
  const [calendarApi, setCalendarApi] = useState<null | any>(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const {settings} = useSettings()
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.calendar)

  const addEventSidebarWidth = 400
  const {skin, direction} = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  useEffect(() => {
    dispatch(fetchEvents(store.selectedCalendars as CalendarFiltersType[]))
  }, [dispatch, store.selectedCalendars])

  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  return (
    <Box height='100%'>
      <CalendarWrapper className='app-calendar' sx={{
        height: '100%',
        boxShadow: skin === 'bordered' ? 0 : 6,
        ...(skin === 'bordered' && {border: theme => `1px solid ${theme.palette.divider}`})
      }}>
        <Box
          sx={{
            height: '100%',
            p: 5,
            pb: 0,
            flexGrow: 1,
            borderRadius: 1,
            boxShadow: 'none',
            backgroundColor: 'background.paper',
            ...(mdAbove ? {borderTopLeftRadius: 0, borderBottomLeftRadius: 0} : {})
          }}
        >
          <Calendar
            store={store}
            dispatch={dispatch}
            direction={direction}
            updateEvent={updateEvent}
            calendarApi={calendarApi}
            calendarsColor={calendarsColor}
            setCalendarApi={setCalendarApi}
            handleSelectEvent={handleSelectEvent}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        </Box>
        <AddEventSidebar
          store={store}
          dispatch={dispatch}
          addEvent={addEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
          calendarApi={calendarApi}
          drawerWidth={addEventSidebarWidth}
          handleSelectEvent={handleSelectEvent}
          addEventSidebarOpen={addEventSidebarOpen}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </CalendarWrapper>
    </Box>
  )
}

export default AppCalendar