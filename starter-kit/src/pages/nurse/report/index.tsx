import { useEffect, useState } from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { CLIENT_RENEG_LIMIT } from 'tls'
import { log } from 'console'
import { CardHeader, TextField } from '@mui/material'

export type Result = {
  id: number
  firstName: string
  lastName: string
  email: string
  age: string
  phoneNumber: string
  address: string
  gender: string
  ssn: string
  imageUrl: string
  role: string
}

interface CellType {
  row: Result
}

const defaultColumns = [
  {
    flex: 0.25,
    minWidth: 50,
    field: 'lastName',
    headerName: 'Овог',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.lastName}</Typography>
  },
  {
    flex: 0.25,
    minWidth: 50,
    field: 'firstName',
    headerName: 'Нэр',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.firstName}</Typography>
  },
  {
    flex: 1.25,
    minWidth: 125,
    field: 'treatment',
    headerName: 'Эмчилгээ',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.emchilgee}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 125,
    field: 'Count',
    headerName: 'Хэдэн удаа',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.heden_udaa}</Typography>
  }
]

const Report = () => {
  const [clients, setClients] = useState<Array<Result>>([])
  const [pageSize, setPageSize] = useState<number>(20)
  const [value, setValue] = useState<string>('')
  const supabase = useSupabaseClient()

  useEffect(() => {
    const initClient = async () => {
      const usersResult = await supabase.from('users').select()
      const tuhuurumjResult = await supabase.from('tuhuurumj').select()
      const tsagResult = await supabase.from('tsag_burtgel').select()
      if (!usersResult.data) return

      const tempClients = []
      const temp2 = []

      for (const tsag of tsagResult.data) {
        for (const client of usersResult.data) {
          if (client.id === tsag.client_id) {
            tempClients.push({
              ...client.raw_user_meta_data,
              tuhuurumj_id: tsag.tuhuurumj_id,
              id: client.id
            })
          }
        }
      }
      for (const tuhuurumj of tuhuurumjResult.data) {
        for (const temp of tempClients) {
          if (temp.tuhuurumj_id?.toString() === tuhuurumj.id?.toString()) {
            temp2.push({
              ...tuhuurumj,
              lastName: temp.lastName,
              firstName: temp.firstName,
              id: tuhuurumj.id
            })
          }
        }
      }

      setClients(temp2 as Result[])
    }

    initClient()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  return (
    <Grid container spacing={6} height='100%'>
      <Grid item xs={12} height='100%'>
        <Card sx={{ height: '100%' }}>
          <CardHeader
            title='Projects'
            action={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant='body2' sx={{ mr: 2 }}>
                  Search:
                </Typography>
                <TextField size='small' value={value} onChange={e => handleFilter(e.target.value)} />
              </Box>
            }
          />
          <DataGrid
            autoPageSize={true}
            pagination
            rows={clients}
            columns={defaultColumns}
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            componentsProps={{
              pagination: {
                labelRowsPerPage: '1 хуудсан дахь мөр'
              }
            }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Report
