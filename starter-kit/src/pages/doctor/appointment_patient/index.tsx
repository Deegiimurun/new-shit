import Box from '@mui/material/Box'
import {Theme} from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import {useSettings} from 'src/@core/hooks/useSettings'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {CalendarOptions} from "@fullcalendar/core";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const calendarsColor = {
  inprogress: 'warning',
  finished: 'success',
}

type EventType = {
  id: string
  end: Date | string
  start: Date | string
  title: string
  className: string
  extendedProps: {
    status: string
  }
}


const AppCalendar = () => {
  const [events, setEvents] = useState<Array<EventType>>([])
  const {settings} = useSettings()
  const router = useRouter()

  useEffect(() => {
    refreshEvents()
  }, [])

  const refreshEvents = async () => {
    const {data} = await supabase.from('tsag_burtgel').select('*').eq('type', 'uzleg')
    const tempEvents: Array<EventType> = [];

    data?.forEach(row => {
      const start = new Date(row.date)
      const end = new Date(row.date);
      end.setMinutes(start.getMinutes() + 30)
      let status = ''
      let title = ''
      const className = 'enabled-cell'

      if (row['uzleg_id']) {
        status = 'finished';
        title = 'Бүртгэл хийгдсэн'
      } else {
        status = 'inprogress';
        title = 'Хүлээгдэж байна'
      }

      tempEvents.push({
        id: row.id,
        start,
        end,
        title,
        className,
        extendedProps: {
          status
        }
      });
    });

    setEvents(tempEvents);
  }

  const supabase = useSupabaseClient();
  const {skin, direction} = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const calendarOptions: CalendarOptions = {
    events: events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'timeGridDay',
    headerToolbar: {
      start: 'prev, next, title',
      end: ''
    },
    allDaySlot: false,
    slotLabelInterval: "00:30:00",
    slotLabelFormat: {hour12: false, hour: 'numeric', minute: "numeric"},
    slotMinTime: '10:00:00',
    slotMaxTime: '19:00:00',
    dragScroll: true,
    navLinks: true,
    eventClassNames({event: calendarEvent}: any) {
      // @ts-ignore
      const colorName = calendarsColor[calendarEvent._def.extendedProps.status]

      return [`bg-${colorName} `]
    },
    eventClick({event: clickedEvent}: any) {
      router.push(`/doctor/insert?appointment-id=${clickedEvent._def.publicId}`)
    },

    direction
  }

  return (
    <Box height='100%'>
      <CalendarWrapper
        className='app-calendar'
        sx={{
          height: '100%',
          boxShadow: skin === 'bordered' ? 0 : 6,
          ...(skin === 'bordered' && {border: theme => `1px solid ${theme.palette.divider}`})
        }}
      >
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
          <FullCalendar height='100%' {...calendarOptions} />
        </Box>
      </CalendarWrapper>
    </Box>
  )
}

export default AppCalendar
