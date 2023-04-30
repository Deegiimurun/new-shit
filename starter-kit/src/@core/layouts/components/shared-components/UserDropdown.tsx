// ** React Imports
import {useState, SyntheticEvent,} from 'react'

// ** Next Import
import {useRouter} from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Context
import {useAuth} from 'src/hooks/useAuth'

// ** Type Imports
import {Settings} from 'src/@core/context/settingsContext'

interface Props {
  settings: Settings
}

// ** Styled Components
const BadgeContentSpan = styled('span')(({theme}) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = (props: Props) => {
  // ** Props
  const {settings} = props

  // ** States
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  // ** Hooks
  const router = useRouter()
  const {logout, user} = useAuth()

  // ** Vars
  const {direction} = settings

  const handleDropdownOpen = (event: SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = (url?: string) => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'none',
    '& svg': {
      mr: 2,
      fontSize: '1.375rem',
      color: 'text.primary'
    }
  }

  const handleLogout = () => {
    logout()
    handleDropdownClose()
  }

  return (
    <>
      <Avatar
        onClick={handleDropdownOpen}
        sx={{width: 40, height: 40}}
        alt='avatar' src={user?.user_metadata.imageUrl}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{'& .MuiMenu-paper': {width: 230, mt: 4}}}
        anchorOrigin={{vertical: 'bottom', horizontal: direction === 'ltr' ? 'right' : 'left'}}
        transformOrigin={{vertical: 'top', horizontal: direction === 'ltr' ? 'right' : 'left'}}
      >
        <Box sx={{pt: 2, pb: 3, px: 4}}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Avatar alt='avatar' src={user?.user_metadata.imageUrl} sx={{width: '2.5rem', height: '2.5rem'}}/>
            <Box sx={{display: 'flex', ml: 3, alignItems: 'flex-start', flexDirection: 'column'}}>
              <Typography sx={{fontWeight: 600}}>{`${user?.user_metadata.firstName} ${user?.user_metadata.lastName}`}</Typography>
              <Typography variant='body2' sx={{fontSize: '0.8rem', color: 'text.disabled'}}>
                {(() => {
                  if (user?.user_metadata.role === 'doctor') return 'Эмч'
                  if (user?.user_metadata.role === 'nurse') return 'Сувилагч'

                  return 'Хэрэглэгч';
                })()}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider/>
        {(() => {
          if (user?.user_metadata.role === 'doctor') return
          if (user?.user_metadata.role === 'nurse') return

          return (
            <MenuItem sx={{p: 0}} onClick={() => {router.push('/client/account-settings')}}>
              <Box sx={styles}>
                <Icon icon='mdi:cog-outline'/>
                Тохиргоо
              </Box>
            </MenuItem>
          );
        })()}

        <Divider/>
        <MenuItem
          onClick={handleLogout}
          sx={{py: 2, '& svg': {mr: 2, fontSize: '1.375rem', color: 'text.primary'}}}
        >
          <Icon icon='mdi:logout-variant'/>
          Гарах
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserDropdown
