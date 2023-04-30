import {FormEvent, ReactNode, useState} from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box, {BoxProps} from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import useMediaQuery from '@mui/material/useMediaQuery'
import OutlinedInput from '@mui/material/OutlinedInput'
import {styled, useTheme} from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography, {TypographyProps} from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import themeConfig from 'src/configs/themeConfig'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import {useSettings} from 'src/@core/hooks/useSettings'
import {useAuth} from '../../hooks/useAuth'
import Image from 'next/image'

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)<BoxProps>(({theme}) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const RegisterIllustration = styled('img')(({theme}) => ({
  maxWidth: '46rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '35rem'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({theme}) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({theme}) => ({
  [theme.breakpoints.down('xl')]: {
    width: '100%'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({theme}) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: {mt: theme.spacing(8)}
}))

const LinkStyled = styled(Link)(({theme}) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [data, setData] = useState<any>({})

  // ** Hooks
  const theme = useTheme()
  const {settings} = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))
  const auth = useAuth()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(data)
  }

  const {skin} = settings

  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
          <RegisterIllustrationWrapper
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <RegisterIllustration
              sx={{
                width: '50%',
                height: 'auto'
              }}
              alt='register-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </RegisterIllustrationWrapper>
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? {borderLeft: `1px solid ${theme.palette.divider}`} : {}}>
        <Box
          sx={{
            p: 12,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image alt='alt' priority src='/logo2.png' height={29} width={35}/>
              <Typography
                variant='h6'
                sx={{
                  ml: 3,
                  lineHeight: 1,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '1.5rem !important'
                }}
              >
                {themeConfig.appName}
              </Typography>
            </Box>
            <Box sx={{mb: 6}}>
              <TypographyStyled variant='h5'>Бүртгэл үүсгэх 🚀</TypographyStyled>
              <Typography variant='body2'>Бүртгэлээ үүсгэж системийг ашиглана уу!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={onSubmit}>
              <FormControl fullWidth sx={{mb: 4}}>
                <TextField
                  autoFocus
                  label='И-мэйл хаяг'
                  value={data?.['email'] || ''}
                  onChange={e => {
                    setData({...data, email: e.target.value})
                  }}
                  placeholder='stud@num.mn'
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='auth-login-v2-password'>Password</InputLabel>
                <OutlinedInput
                  value={data?.['password'] || ''}
                  label='Нууц үг'
                  onChange={e => {
                    setData({...data, password: e.target.value})
                  }}
                  id='auth-login-v2-password'
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20}/>
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox/>}
                sx={{mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': {fontSize: '0.875rem'}}}
                label={
                  <>
                    <Typography variant='body2' component='span'>
                      Зөвшөөрч байна{' '}
                    </Typography>
                    <LinkStyled href='/' onClick={e => e.preventDefault()}>
                      гэрээг
                    </LinkStyled>
                  </>
                }
              />
              <Button fullWidth size='large' type='submit' variant='contained' sx={{mb: 7}}>
                Бүртгүүлэх
              </Button>
              <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center'}}>
                <Typography variant='body2' sx={{mr: 2}}>
                  Аль хэдийн бүртгэлтэй юу?
                </Typography>
                <Typography variant='body2'>
                  <LinkStyled href='/login'>Нэвтрэх</LinkStyled>
                </Typography>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  )
}

Register.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Register.guestGuard = true

export default Register
