import { useState } from 'react'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import { styled } from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStepper, { StepperProps } from '@mui/material/Stepper'
import Icon from 'src/@core/components/icon'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const steps = [
  {
    title: 'Амин үзүүлэлт',
    icon: <Icon width='56px' height='56px' icon='mdi:clipboard-pulse-outline' />
  },
  {
    title: 'Эмчилгээний бүртгэл',
    icon: <Icon width='56px' height='56px' icon='mdi:stethoscope' />
  }
]

const Stepper = styled(MuiStepper)<StepperProps>(({ theme }) => ({
  margin: 'auto',
  maxWidth: 800,
  justifyContent: 'space-around',

  '& .MuiStep-root': {
    cursor: 'pointer',
    textAlign: 'center',
    paddingBottom: theme.spacing(8),
    '& .step-title': {
      fontSize: '1rem'
    },
    '&.Mui-completed + svg': {
      color: theme.palette.primary.main
    },
    '& + svg': {
      display: 'none',
      color: theme.palette.text.disabled
    },

    '& .MuiStepLabel-label': {
      display: 'flex',
      cursor: 'pointer',
      alignItems: 'center',
      svg: {
        marginRight: theme.spacing(1.5),
        color: theme.palette.text.primary
      },
      '&.Mui-active': {
        '& .MuiTypography-root': {
          color: theme.palette.primary.main
        },
        '& svg': {
          color: theme.palette.primary.main
        }
      }
    },

    [theme.breakpoints.up('md')]: {
      paddingBottom: 0,
      '& + svg': {
        display: 'block'
      },
      '& .MuiStepLabel-label': {
        display: 'block'
      }
    }
  }
}))

const CheckoutWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState<number>(0)

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid height='100%' container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
              <Card>
                <form>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Ухаан санаа'
                          placeholder='Ухаан санаа'

                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Пульс'
                          placeholder='Пульс'

                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Амьсгалын тоо'
                          // value={formData.email}
                          placeholder='Амьсгалын тоо'

                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Биеийн температур'
                          placeholder='Биеийн температур'

                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт дээд'
                          // value={formData.number}
                          placeholder='Баруун даралт дээд'

                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт доод'
                          placeholder='Баруун даралт доод'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт дундаж'
                          placeholder='Баруун даралт дундаж'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт нэмэлт'
                          placeholder='Баруун даралт нэмэлт'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт дээд'
                          placeholder='Зүүн даралт дээд'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт доод'
                          placeholder='Зүүн даралт доод'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт дундаж'
                          placeholder='Зүүн даралт дундаж'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт нэмэлт'
                          placeholder='Зүүн даралт нэмэлт'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Сатураци'
                          placeholder='Сатураци'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өндөр'
                          placeholder='Өндөр'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Жин'
                          placeholder='Жин'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='БЖИ'
                          placeholder='БЖИ'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
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
        )
      case 1:
        return (
          <Grid height='100%' container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
              <Card>
                <form>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Эмчилгээ'
                          placeholder='Эмчилгээ'

                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Хэдэн удаа'
                          placeholder='Хэдэн удаа'

                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Шалтгаан'
                          // value={formData.email}
                          placeholder='Өвчний учир амбулатори'

                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
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
        )
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ py: 5.375 }}>
        <StepperWrapper>
          <Stepper activeStep={activeStep} connector={<Icon icon='mdi:chevron-right' />}>
            {steps.map((step, index) => {
              return (
                <Step key={index} onClick={() => setActiveStep(index)} sx={{}}>
                  <StepLabel icon={<></>}>
                    {step.icon}
                    <Typography className='step-title'>{step.title}</Typography>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </CardContent>

      <Divider sx={{ m: '0 !important' }} />

      <CardContent sx={{ height: '100%' }}>{renderContent()}</CardContent>
    </Card>
  )
}

export default CheckoutWizard
