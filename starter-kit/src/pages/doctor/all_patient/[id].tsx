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
    title: 'Үзлэг',
    icon: <Icon width='56px' height='56px' icon='mdi:stethoscope' />
  },
  {
    title: 'Онош',
    icon: <Icon width='56px' height='56px' icon='mdi:file-check-outline' />
  },
  {
    title: 'Эмчилгээ',
    icon: <Icon width='56px' height='56px' icon='mdi:pill' />
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
      '&.Mui-active, &.Mui-completed': {
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
                          label='Үзлэг хийгдсэн огноо'
                          placeholder='Үзлэг хийгдсэн огноо'

                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Эмчийн үзлэг'
                          placeholder='Эмчийн үзлэг'

                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өвчний учир амбулатори'
                          // value={formData.email}
                          placeholder='Өвчний учир амбулатори'

                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Өвчлөлтэй эсэх</InputLabel>
                          <Select
                            label='Өвчлөлтэй эсэх'

                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Тийм</MenuItem>
                            <MenuItem value='female'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Үзлэгийн төрөл'
                          placeholder='Үзлэгийн төрөл'

                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Үндсэн онош'
                          // value={formData.number}
                          placeholder='Үндсэн онош'

                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өвчний шалтгаан'
                          placeholder='Өвчний шалтгаан'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өвчлөл'
                          placeholder='Өвчлөл'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Дээд шатлалд илгээсэн эсэх</InputLabel>
                          <Select
                            label='Дээд шатлалд илгээсэн эсэх'

                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Тийм</MenuItem>
                            <MenuItem value='female'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Хийгдсэн ажилбар'
                          placeholder='Хийгдсэн ажилбар'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Хүчирхийлэлд өртсөн эсэх</InputLabel>
                          <Select
                            label='Хүчирхийлэлд өртсөн эсэх'

                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Тийм</MenuItem>
                            <MenuItem value='female'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Хөдөлмөр алдалтын хоног'
                          placeholder='Хөдөлмөр алдалтын хоног'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Эргэж холбогдох шаардлагатай эсэх</InputLabel>
                          <Select
                            label='Эргэж холбогдох шаардлагатай эсэх'

                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Тийм</MenuItem>
                            <MenuItem value='female'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Шалтгаан'
                          placeholder='Шалтгаан'

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
                          label='Ерөнхий төрөл'
                          placeholder='Ерөнхий төрөл'

                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Ерөнхий төрөл код'
                          placeholder='Ерөнхий төрөл код'

                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Төрөл'
                          // value={formData.email}
                          placeholder='Төрөл'

                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Төрөл код'
                          placeholder='Төрөл код'

                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Дэд төрөл'
                          // value={formData.number}
                          placeholder='Дэд төрөл'

                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Дэд төрөл код'
                          placeholder='Дэд төрөл код'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өгөгдөл'
                          placeholder='Өгөгдөл'

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
      case 2:
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
                          label='Эмчилгээний тоо'
                          placeholder='Эмчилгээний тоо'

                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Ямар эрхтэнд'
                          placeholder='Ямар эрхтэнд'

                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зай'
                          // value={formData.email}
                          placeholder='Зай'

                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Тун'
                          placeholder='Тун'

                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Үргэлжлэх хугацаа'
                          // value={formData.number}
                          placeholder='Үргэлжлэх хугацаа'

                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Талбай'
                          placeholder='Талбай'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Давтамж'
                          placeholder='Давтамж'

                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Хэдэн удаа'
                          placeholder='Хэдэн удаа'

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
