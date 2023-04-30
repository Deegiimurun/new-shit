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
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {CalendarOptions} from "@fullcalendar/core";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useAuth} from "../../hooks/useAuth";

const calendarsColor = {
  error: 'error',
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
  const [open, setOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<Array<EventType>>([])
  const {settings} = useSettings()
  const router = useRouter()
  const auth = useAuth()

  useEffect(() => {
    refreshEvents()
  }, [])

  const refreshEvents = async () => {
    const {data} = await supabase.from('tsag_burtgel').select('*').neq('type', 'yaraltai')
    const tempEvents: Array<EventType> = [];

    data?.forEach(row => {
      console.log(row)
      const start = new Date(row.date)
      const end = new Date(row.date);
      end.setMinutes(start.getMinutes() + 30)
      let status = ''
      let title = ''
      let className = 'enabled-cell'

      if (row['client_id'] !== auth.user?.id) {
        status = 'error'
        title = 'Цаг авах боломжгүй'
        className = 'disabled-cell'
      } else {
        if (row['amin_uzuulelt_id'] && row['uzleg_id']) {
          status = 'finished';
          title = 'Дууссан'
        } else {
          status = 'inprogress';
          title = 'Бүртгэл хийгдсэн'
        }
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
      if (clickedEvent._def.extendedProps.status === 'error') return;
      router.push(`/client/test-result/${clickedEvent._def.publicId}`)
    },

    dateClick(info: any) {
      setSelectedDate(info.date as Date)
      setOpen(true)
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
        <Dialog
          open={open}
          disableEscapeKeyDown
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullWidth
          onClose={() => {
            setOpen(false)
          }}
        >
          <DialogTitle id='alert-dialog-title'>Цаг авахдаа итгэлтэй байна уу?</DialogTitle>
          <DialogContent
            sx={{
              p: theme => `${theme.spacing(10)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            }}
          >
            <DialogContentText id='alert-dialog-description'>
              Та эмчилгээний цаг болон үзлэгийн цаг авах боломжтой.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            sx={{
              pb: theme => `${theme.spacing(10)} !important`,
              px: theme => [`${theme.spacing(5)} !important`, `${theme.spacing(15)} !important`],
            }}
            className='dialog-actions-dense'>
            <Button variant='contained' onClick={async () => {
              await supabase
                .from('tsag_burtgel')
                .insert({
                  'client_id': auth.user?.id,
                  'date': selectedDate,
                  'type': 'emchilgee'
                });
              await refreshEvents()
              setOpen(false);
            }}>Эмчилгээний цаг авах</Button>
            <Button variant='contained' onClick={async () => {
              await supabase
                .from('tsag_burtgel')
                .insert({
                  'client_id': auth.user?.id,
                  'date': selectedDate,
                  'type': 'uzleg'
                });
              await refreshEvents()
              setOpen(false)
            }}>Үзлэгийн цаг авах</Button>
          </DialogActions>
        </Dialog>
      </CalendarWrapper>
    </Box>
  )
}

export default AppCalendar
