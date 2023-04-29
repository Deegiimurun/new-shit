import {useState} from 'react'
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

export type InvoiceType = {
  id: number
  name: string
  total: number
  avatar: string
  service: string
  dueDate: string
  address: string
  company: string
  country: string
  contact: string
  avatarColor?: string
  issuedDate: string
  companyEmail: string
  balance: string | number
}

interface CellType {
  row: InvoiceType
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
    headerName: 'Шинжилгээ өгсөн огноо',
    renderCell: ({row}: CellType) => <Typography variant='body2'>{row.issuedDate}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 90,
    field: 'balance',
    headerName: 'Төлөв',
    renderCell: ({row}: CellType) => {
      return row.balance !== 0 ? (
        <CustomChip size='small' skin='light' color='info' label='Хүлээгдэж байна'/>
      ) : (
        <CustomChip size='small' skin='light' color='success' label='Хариу гарсан'/>
      )
    }
  }
]

const InvoiceList = () => {
  const [pageSize, setPageSize] = useState<number>(10)

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
            <IconButton size='small' component={Link} href={`/client/test-result/${row.id}`}>
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
            autoHeight
            pagination
            rows={[]}
            columns={columns}
            checkboxSelection
            disableSelectionOnClick
            pageSize={Number(pageSize)}
            rowsPerPageOptions={[10, 25, 50]}
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

export default InvoiceList
