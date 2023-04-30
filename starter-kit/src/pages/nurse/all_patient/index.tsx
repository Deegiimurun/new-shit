import {useEffect, useState} from 'react'
import Link from 'next/link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import Icon from 'src/@core/components/icon'
import {useSupabaseClient} from "@supabase/auth-helpers-react";

export type Result = {
  id: number
  firstName: string,
  lastName: string,
  email: string,
  age: string,
  phoneNumber: string,
  address: string,
  gender: string,
  ssn: string,
  imageUrl: string,
  role: string,
}

interface CellType {
  row: Result
}

const defaultColumns = [
  {
    flex: 0.15,
    minWidth: 125,
    field: 'lastName',
    headerName: 'Овог',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.lastName}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'firstName',
    headerName: 'Нэр',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.firstName}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'ssn',
    headerName: 'Регистрийн дугаар',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.ssn}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'Age',
    headerName: 'Нас',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row.age}</Typography>
  },
]

const PatientList = () => {
  const [clients, setClients] = useState<Array<Result>>([])
  const [pageSize, setPageSize] = useState<number>(20)
  const supabase = useSupabaseClient();

  useEffect(() => {
    const initClient = async () => {
      const usersResult = await supabase.from('users').select()

      if (!usersResult.data) return

      const tempClients = []

      console.log(usersResult.data)

      for (const client of usersResult.data) {
        if (client.raw_user_meta_data?.role === 'client') {
          tempClients.push({
            ...client.raw_user_meta_data,
            id: client.id
          })
        }
      }

      setClients(tempClients as Result[])
    }

    initClient()
  }, [])

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 130,
      sortable: false,
      field: 'actions',
      headerName: 'Дэлгэрэнгүй',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='Харах'>
            <IconButton size='small' component={Link} href={`/doctor/all_patient/${row.id}`}>
              <Icon icon='mdi:eye-outline' fontSize={20} />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ]

  return (
    <Grid container spacing={6} height='100%'>
      <Grid item xs={12} height='100%'>
        <Card sx={{ height: '100%' }}>
          <DataGrid
            autoPageSize={true}
            pagination
            rows={clients}
            columns={columns}
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

export default PatientList
