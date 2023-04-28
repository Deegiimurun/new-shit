// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { CalendarFiltersType, AddEventType, EventType } from 'src/types/apps/calendarTypes'

// ** Fetch Events
export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (calendars: CalendarFiltersType[]) => {
  const date = new Date()
  const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

  const nextMonth =
    date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)

  const prevMonth =
    date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

  const data: { events: EventType[] } = {
    events: [
      {
        id: 1,
        url: '',
        title: 'Үзлэгтэй',
        start: date,
        end: date,
        allDay: false,
        extendedProps: {
          calendar: 'Business'
        }
      },
      {
        id: 3,
        url: '',
        title: 'Хариу эерэг гарсан',
        allDay: true,
        start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
        end: new Date(date.getFullYear(), date.getMonth() + 1, -8),
        extendedProps: {
          calendar: 'Holiday'
        }
      },
      {
        id: 4,
        url: '',
        title: "Хариу сөрөг гарсан",
        start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
        end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
        allDay: true,
        extendedProps: {
          calendar: 'Personal'
        }
      },
      {
        id: 5,
        url: '',
        title: 'Шинжилгээний хариу гарж байна',
        start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
        end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
        allDay: true,
        extendedProps: {
          calendar: 'ETC'
        }
      },
      {
        id: 7,
        url: '',
        title: 'Хүлээгдэж байна',
        start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
        end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
        allDay: true,
        extendedProps: {
          calendar: 'Family'
        }
      },
      {
        id: 9,
        url: '',
        title: 'Үзлэг захиалсан',
        start: nextMonth,
        end: nextMonth,
        allDay: true,
        extendedProps: {
          calendar: 'Business'
        }
      },
      {
        id: 10,
        url: '',
        title: 'Monthly Checkup',
        start: prevMonth,
        end: prevMonth,
        allDay: true,
        extendedProps: {
          calendar: 'Personal'
        }
      }
    ]
  }

  return data.events as any;
})

// ** Add Event
export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event: AddEventType, { dispatch }) => {
  const response = await axios.post('/apps/calendar/add-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data.event
})

// ** Update Event
export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (event: EventType, { dispatch }) => {
  const response = await axios.post('/apps/calendar/update-event', {
    data: {
      event
    }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data.event
})

// ** Delete Event
export const deleteEvent = createAsyncThunk('appCalendar/deleteEvent', async (id: number | string, { dispatch }) => {
  const response = await axios.delete('/apps/calendar/remove-event', {
    params: { id }
  })
  await dispatch(fetchEvents(['Personal', 'Business', 'Family', 'Holiday', 'ETC']))

  return response.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: null,
    selectedCalendars: ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
  },
  reducers: {
    handleSelectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    handleCalendarsUpdate: (state, action) => {
      const filterIndex = state.selectedCalendars.findIndex(i => i === action.payload)
      if (state.selectedCalendars.includes(action.payload)) {
        state.selectedCalendars.splice(filterIndex, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }
      if (state.selectedCalendars.length === 0) {
        state.events.length = 0
      }
    },
    handleAllCalendars: (state, action) => {
      const value = action.payload
      if (value === true) {
        state.selectedCalendars = ['Personal', 'Business', 'Family', 'Holiday', 'ETC']
      } else {
        state.selectedCalendars = []
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.events = action.payload
    })
  }
})
export const { handleSelectEvent, handleCalendarsUpdate, handleAllCalendars } = appCalendarSlice.actions

export default appCalendarSlice.reducer
