import {useEffect, useState} from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import {styled} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import {DataGrid} from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import CustomChip from 'src/@core/components/mui/chip'
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";

export type Result = {
  id: string
  date: string
  status: string
}

interface CellType {
  row: Result
}


const LinkStyled = styled(Link)(({theme}) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))


const defaultColumns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: '#',
    renderCell: ({row}: CellType) => <LinkStyled href={`/apps/invoice/preview/${row.id}`}>{`#${row.id}`}</LinkStyled>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'issuedDate',
    headerName: 'Огноо',
    renderCell: ({row}: CellType) => <Typography variant='body2'>{row.date}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'balance',
    headerName: 'Төлөв',
    renderCell: ({row}: CellType) => {
      return row.status !== 'finished' ? (
        <CustomChip size='small' skin='light' color='info' label='Хүлээгдэж байна'/>
      ) : (
        <CustomChip size='small' skin='light' color='success' label='Хариу гарсан'/>
      )
    }
  }
]

const TestResults = () => {
  const [pageSize, setPageSize] = useState<number>(20)
  const [events, setEvents] = useState<Array<Result>>([])
  const supabase = useSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    refreshEvents()
  }, [])

  const refreshEvents = async () => {
    const {data} = await supabase.from('tsag_burtgel').select('*').eq('client_id', router.query['client-id'])
    const tempEvents: Array<Result> = [];

    data?.forEach(row => {
      const date = new Date(row.date)

      let status = ''

      if (row['uzleg_id']) {
        status = 'finished';
      } else {
        status = 'inprogress';
      }

      tempEvents.push({
        id: row.id,
        date: `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}
               ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`,
        status
      });
    });

    setEvents(tempEvents);
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Дэлгэрэнгүй',
      renderCell: ({row}: CellType) => (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Tooltip title='Харах'>
            <IconButton size='small' component={Link} href={`/doctor/insert/?appointment-id=${row.id}`}>
              <Icon icon='mdi:eye-outline' fontSize={20}/>
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6} height='100%'>
      <Grid item xs={12}
            height='100%'>
        <Card sx={{height: '100%'}}>
          <DataGrid
            autoPageSize={true}
            pagination
            rows={events}
            columns={columns}
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            componentsProps={{
              pagination: {
                labelRowsPerPage: '1 хуудсан дахь мөр',
              },
            }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default TestResults
