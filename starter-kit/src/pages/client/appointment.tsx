import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSettings } from 'src/@core/hooks/useSettings'
import CalendarWrapper from 'src/@core/styles/libs/fullcalendar'
import FormControl from '@mui/material/FormControl'
import { Drawer } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

import Icon from 'src/@core/components/icon'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import MenuItem from '@mui/material/MenuItem'
import listPlugin from '@fullcalendar/list'
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const calendarsColor = {
  Personal: 'error',
  Business: 'primary',
  Family: 'warning',
  Holiday: 'success',
  ETC: 'info'
}

const blankEvent = {
  title: '',
  start: '',
  end: '',
  allDay: false,
  url: '',
  extendedProps: {
    calendar: '',
    guests: [],
    location: '',
    description: ''
  }
}

const date = new Date()
const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

const nextMonth =
  date.getMonth() === 11 ? new Date(date.getFullYear() + 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1)

const prevMonth =
  date.getMonth() === 11 ? new Date(date.getFullYear() - 1, 0, 1) : new Date(date.getFullYear(), date.getMonth() - 1, 1)

type EventType = {
  id: string
  url: string
  title: string
  allDay: boolean
  end: Date | string
  start: Date | string
  extendedProps: {
    location?: string
    calendar?: string
    description?: string
    guests?: string[] | string | undefined
  }
}

const events: Array<EventType> = [
  {
    id: '1',
    url: '',
    title: 'Design Review',
    start: date,
    end: nextDay,
    allDay: false,
    extendedProps: {
      calendar: 'Business'
    }
  },
  {
    id: '2',
    url: '',
    title: 'Meeting With Client',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      calendar: 'Business'
    }
  },
  {
    id: '3',
    url: '',
    title: 'Family Trip',
    allDay: true,
    start: new Date(date.getFullYear(), date.getMonth() + 1, -9),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -7),
    extendedProps: {
      calendar: 'Holiday'
    }
  },
  {
    id: '4',
    url: '',
    title: "Doctor's Appointment",
    start: new Date(date.getFullYear(), date.getMonth() + 1, -11),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -10),
    allDay: true,
    extendedProps: {
      calendar: 'Personal'
    }
  },
  {
    id: '5',
    url: '',
    title: 'Dart Game?',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'ETC'
    }
  },
  {
    id: '6',
    url: '',
    title: 'Meditation',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Personal'
    }
  },
  {
    id: '7',
    url: '',
    title: 'Dinner',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Family'
    }
  },
  {
    id: '8',
    url: '',
    title: 'Product Review',
    start: new Date(date.getFullYear(), date.getMonth() + 1, -13),
    end: new Date(date.getFullYear(), date.getMonth() + 1, -12),
    allDay: true,
    extendedProps: {
      calendar: 'Business'
    }
  },
  {
    id: '9',
    url: '',
    title: 'Monthly Meeting',
    start: nextMonth,
    end: nextMonth,
    allDay: true,
    extendedProps: {
      calendar: 'Business'
    }
  },
  {
    id: '10',
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

const AppCalendar = () => {
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)

  // ** Hooks
  const { settings } = useSettings()
  const addEventSidebarWidth = 400
  const { skin, direction } = settings
  const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
  const [value, setValue] = useState<string>('1')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const calendarOptions = {
    events: events,
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev, next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    editable: true,
    eventResizableFromStart: true,
    dragScroll: true,
    dayMaxEvents: 1,
    navLinks: true,
    eventClassNames({ event: calendarEvent }: any) {
      // @ts-ignore
      const colorName = calendarsColor[calendarEvent._def.extendedProps.calendar]

      return [`bg-${colorName}`]
    },
    eventClick({ event: clickedEvent }: any) {
      console.log(clickedEvent)
      handleAddEventSidebarToggle()
    },

    dateClick(info: any) {
      const ev = { ...blankEvent }
      ev.start = info.date
      ev.end = info.date
      ev.allDay = true

      handleAddEventSidebarToggle()
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
          ...(skin === 'bordered' && { border: theme => `1px solid ${theme.palette.divider}` })
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
            ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
          }}
        >
          <FullCalendar height='100%' {...calendarOptions} />
        </Box>
        <Drawer
          anchor='right'
          open={addEventSidebarOpen}
          onClose={handleAddEventSidebarToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ '& .MuiDrawer-paper': { width: ['100%', addEventSidebarWidth] } }}
        >
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label='icon tabs example'>
              <Tab value='1' label='Үзлэгийн цаг' icon={<Icon icon='mdi:hospital-building' />} />
              <Tab value='2' label='Эмчилгээний цаг' icon={<Icon icon='mdi:doctor' />} />
            </TabList>
            <TabPanel value='1'>
              <Typography>
                <Grid container spacing={12}>
                  {/* Account Details Card */}
                  <Grid item xs={24}>
                    <Card>
                      <form>
                        <CardContent>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <InputLabel>Цаг</InputLabel>
                                <Select
                                  label='Цаг'
                                  // value={formData.country}
                                  // onChange={e => handleFormChange('country', e.target.value)}
                                >
                                  <MenuItem value='time'>12:00</MenuItem>
                                  <MenuItem value='time'>12:30</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <Button variant='contained' sx={{ mr: 4 }}>
                                Хадгалах
                              </Button>
                              <Button
                                type='reset'
                                variant='outlined'
                                color='secondary'
                                // onClick={() => setFormData(initialData)}
                              >
                                Шинэчлэх
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </form>
                    </Card>
                  </Grid>
                </Grid>
              </Typography>
            </TabPanel>
            <TabPanel value='2'>
              <Typography>
              <Grid container spacing={12}>
                  {/* Account Details Card */}
                  <Grid item xs={24}>
                    <Card>
                      <form>
                        <CardContent>
                          <Grid container spacing={5}>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <InputLabel>Цаг</InputLabel>
                                <Select
                                  label='Цаг'
                                  // value={formData.country}
                                  // onChange={e => handleFormChange('country', e.target.value)}
                                >
                                  <MenuItem value='time'>12:00</MenuItem>
                                  <MenuItem value='time'>12:30</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <Button variant='contained' sx={{ mr: 4 }}>
                                Хадгалах
                              </Button>
                              <Button
                                type='reset'
                                variant='outlined'
                                color='secondary'
                                // onClick={() => setFormData(initialData)}
                              >
                                Шинэчлэх
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </form>
                    </Card>
                  </Grid>
                </Grid>
              </Typography>
            </TabPanel>
          </TabContext>
        </Drawer>
      </CalendarWrapper>
    </Box>
  )
}

export default AppCalendar
