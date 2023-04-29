import {useState} from 'react'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Divider from '@mui/material/Divider'
import {styled} from '@mui/material/styles'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiStepper, {StepperProps} from '@mui/material/Stepper'
import Icon from 'src/@core/components/icon'
import StepperWrapper from 'src/@core/styles/mui/stepper'
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const steps = [
  {
    title: 'Амин үзүүлэлт',
    icon: (
      <Icon width='56px' height='56px' icon='mdi:clipboard-pulse-outline'/>
    )
  },
  {
    title: 'Үзлэг',
    icon: (
      <Icon width='56px' height='56px' icon='mdi:stethoscope'/>
    )
  },
  {
    title: 'Онош',
    icon: (
      <Icon width='56px' height='56px' icon='mdi:file-check-outline'/>
    )
  },
  {
    title: 'Эмчилгээ',
    icon: (
      <Icon width='56px' height='56px' icon='mdi:pill'/>
    )
  }
]

const Stepper = styled(MuiStepper)<StepperProps>(({theme}) => ({
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

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

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
                          label='Нэр'
                          placeholder='Нэр'
                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Овог'
                          placeholder='Овог'
                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='email'
                          label='И-Мэйл'
                          // value={formData.email}
                          placeholder='И-Мэйл'
                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нас'
                          placeholder='Нас'
                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Утасны дугаар'
                          // value={formData.number}
                          placeholder='Утасны дугаар'
                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Гэрийн хаяг'
                          placeholder='Гэрийн хаяг'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Хүйс</InputLabel>
                          <Select
                            label='Хүйс'
                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Эр</MenuItem>
                            <MenuItem value='female'>Эм</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Регистрийн дугаар'
                          placeholder='Регистрийн дугаар'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
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
          <Grid container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
              <Card>
                <form>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нэр'
                          placeholder='Нэр'
                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Овог'
                          placeholder='Овог'
                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='email'
                          label='И-Мэйл'
                          // value={formData.email}
                          placeholder='И-Мэйл'
                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нас'
                          placeholder='Нас'
                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Утасны дугаар'
                          // value={formData.number}
                          placeholder='Утасны дугаар'
                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Гэрийн хаяг'
                          placeholder='Гэрийн хаяг'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Хүйс</InputLabel>
                          <Select
                            label='Хүйс'
                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Эр</MenuItem>
                            <MenuItem value='female'>Эм</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Регистрийн дугаар'
                          placeholder='Регистрийн дугаар'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
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
          <Grid container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
              <Card>
                <form>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нэр'
                          placeholder='Нэр'
                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Овог'
                          placeholder='Овог'
                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='email'
                          label='И-Мэйл'
                          // value={formData.email}
                          placeholder='И-Мэйл'
                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нас'
                          placeholder='Нас'
                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Утасны дугаар'
                          // value={formData.number}
                          placeholder='Утасны дугаар'
                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Гэрийн хаяг'
                          placeholder='Гэрийн хаяг'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Хүйс</InputLabel>
                          <Select
                            label='Хүйс'
                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Эр</MenuItem>
                            <MenuItem value='female'>Эм</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Регистрийн дугаар'
                          placeholder='Регистрийн дугаар'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>
        )
      case 3:
        return (
          <Grid container spacing={6}>
            {/* Account Details Card */}
            <Grid item xs={12}>
              <Card>
                <form>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нэр'
                          placeholder='Нэр'
                          // value={formData.firstName}
                          // onChange={e => handleFormChange('firstName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Овог'
                          placeholder='Овог'
                          // value={formData.lastName}
                          // onChange={e => handleFormChange('lastName', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='email'
                          label='И-Мэйл'
                          // value={formData.email}
                          placeholder='И-Мэйл'
                          // onChange={e => handleFormChange('email', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нас'
                          placeholder='Нас'
                          // value={formData.organization}
                          // onChange={e => handleFormChange('organization', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Утасны дугаар'
                          // value={formData.number}
                          placeholder='Утасны дугаар'
                          // onChange={e => handleFormChange('number', e.target.value)}
                          // InputProps={{ startAdornment: <InputAdornment position='start'>US (+1)</InputAdornment> }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Гэрийн хаяг'
                          placeholder='Гэрийн хаяг'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Хүйс</InputLabel>
                          <Select
                            label='Хүйс'
                            // value={formData.country}
                            // onChange={e => handleFormChange('country', e.target.value)}
                          >
                            <MenuItem value='male'>Эр</MenuItem>
                            <MenuItem value='female'>Эм</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Регистрийн дугаар'
                          placeholder='Регистрийн дугаар'
                          // value={formData.address}
                          // onChange={e => handleFormChange('address', e.target.value)}
                        />
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
    <Card sx={{height: '100%'}}>
      <CardContent sx={{py: 5.375}}>
        <StepperWrapper>
          <Stepper activeStep={activeStep} connector={<Icon icon='mdi:chevron-right'/>}>
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

      <Divider sx={{m: '0 !important'}}/>

      <CardContent sx={{height: '100%'}}>{renderContent()}</CardContent>
    </Card>
  )
}

export default CheckoutWizard
