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
import {CardHeader, TextField} from "@mui/material";

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
    flex: 0.75,
    minWidth: 50,
    field: 'lastName',
    headerName: 'Овог',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.lastName}</Typography>
  },
  {
    flex: 0.75,
    minWidth: 50,
    field: 'firstName',
    headerName: 'Нэр',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.firstName}</Typography>
  },
  {
    flex: 1.25,
    minWidth: 125,
    field: 'turul',
    headerName: 'Онош',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.eronhii_turul}</Typography>
  },
  {
    flex: 1.25,
    minWidth: 125,
    field: 'turul_kod',
    headerName: 'Онош код',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.eronhii_turul_kod}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 125,
    field: 'ded_turul',
    headerName: 'Дэд онош',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.ded_turul}</Typography>
  }
]

const Report = () => {
  const [clients, setClients] = useState<Array<Result>>([])
  const [allClients, setAllClients] = useState<Array<Result>>([])
  const [value, setValue] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(20)
  const supabase = useSupabaseClient()

  useEffect(() => {
    const initClient = async () => {
      const usersResult = await supabase.from('users').select()
      const onoshResult = await supabase.from('onosh').select()
      const tsagResult = await supabase.from('tsag_burtgel').select()
      if (!usersResult.data) return

      const tempClients = []
      const temp2 = []

      for (const tsag of tsagResult.data) {
        for (const client of usersResult.data) {
          if (client.id === tsag.client_id) {

            tempClients.push({
              ...client.raw_user_meta_data,
              onosh_id: tsag.onosh_id,
              id: client.id
            })
          }
        }
      }
      for (const onosh of onoshResult.data) {
        for (const temp of tempClients) {

          if (temp.onosh_id?.toString() === onosh.id?.toString()) {
            temp2.push({
              ...onosh,
              lastName: temp.lastName,
              firstName: temp.firstName,
              id: onosh.id
            })
          }
        }
      }

      setClients(temp2 as Result[])
      setAllClients(temp2 as Result[])
    }

    initClient()
  }, [])


  const handleFilter = (val: string) => {
    const arr: Array<Result> = [];

    allClients.forEach(value1 => {
      const a = Object.values(value1);

      for (const element of a) {
        if (!element) continue;
        if (element.toString().includes(val)) {
          arr.push(value1);
          break;
        }
      }
    })

    setClients(arr)
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
