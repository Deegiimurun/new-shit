import {useEffect, useState} from 'react'
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
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const steps = [
  {
    title: 'Өвчтөн',
    icon: <Icon width='56px' height='56px' icon='mdi:account-check'/>
  },
  {
    title: 'Үзлэг',
    icon: <Icon width='56px' height='56px' icon='mdi:stethoscope'/>
  },
  {
    title: 'Онош',
    icon: <Icon width='56px' height='56px' icon='mdi:file-check-outline'/>
  },
  {
    title: 'Эмчилгээ',
    icon: <Icon width='56px' height='56px' icon='mdi:pill'/>
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

const ImgStyled = styled('img')(({theme}) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const CheckoutWizard = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [client, setClient] = useState<any>()
  const [appointment, setAppointment] = useState<any>()
  const [uzleg, setUzleg] = useState<any>({})
  const [onosh, setOnosh] = useState<any>({})
  const [emchilgee, setEmgchilgee] = useState<any>({})
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
      const checkAppointment = async () => {
        if (!router.query['appointmed-id']) return

        const appointmentResult = await supabase.from('tsag_burtgel').select('*').eq('id', router.query['appointmed-id'])
        if (!appointmentResult.data) return

        setAppointment(appointmentResult.data[0])
        const usersResult = await supabase.from('users').select()

        if (!usersResult.data) return


        for (const client of usersResult.data) {
          if (client.id === appointmentResult.data[0]['client_id']) {
            setClient(client)
            break
          }
        }
      }

      const checkClient = async () => {
        if (!router.query['client-id']) return

        const usersResult = await supabase.from('users').select()

        if (!usersResult.data) return

        let isUserExist = false;

        for (const client of usersResult.data) {
          if (client.id === router.query['client-id']) {
            setClient(client)
            isUserExist = true
            break
          }
        }

        if (!isUserExist) return;

        const appointmentResult = await supabase
          .from('tsag_burtgel')
          .insert({
            'client_id': router.query['client-id'],
            'type': 'yaraltai'
          }).select('*');

        if (!appointmentResult.data) return;

        setAppointment(appointmentResult.data[0])
      }


    checkClient()
    checkAppointment()

    }, [router.query, supabase]
  )

  useEffect(() => {
    if (!appointment) return;

    const initUzleg = async () => {
      if (!appointment['uzleg_id']) {
        const {data} = await supabase
          .from('uzleg')
          .insert({}).select('*');
        if (!data) return;
        await supabase.from('tsag_burtgel').update({'uzleg_id': data[0]['id']}).eq('id', appointment['id'])
        setUzleg(data[0])
      } else {
        const {data} = await supabase
          .from('uzleg')
          .select()
          .eq('id', appointment['uzleg_id']);
        if (!data) return;
        setUzleg(data[0])
      }
    }

    const initOnosh = async () => {
      if (!appointment['onosh_id']) {
        const {data} = await supabase
          .from('onosh')
          .insert({}).select('*');
        if (!data) return;
        await supabase.from('tsag_burtgel').update({'onosh_id': data[0]['id']}).eq('id', appointment['id'])
        setOnosh(data[0])
      } else {
        const {data} = await supabase
          .from('onosh')
          .select()
          .eq('id', appointment['onosh_id']);
        if (!data) return;
        setOnosh(data[0])
      }
    }

    const initEmchilgee = async () => {
      if (!appointment['emchilgee_id']) {
        const {data} = await supabase
          .from('emchilgee')
          .insert({}).select('*');
        if (!data) return;
        await supabase.from('tsag_burtgel').update({'emchilgee_id': data[0]['id']}).eq('id', appointment['id'])
        setEmgchilgee(data[0])
      } else {
        const {data} = await supabase
          .from('emchilgee')
          .select()
          .eq('id', appointment['emchilgee_id']);
        if (!data) return;
        setEmgchilgee(data[0])
      }
    }

    initUzleg()
    initOnosh()
    initEmchilgee()
  }, [appointment]);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid height='100%' container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <form noValidate autoComplete='off'>
                  <CardContent sx={{pb: theme => `${theme.spacing(10)}`}}>
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                      <ImgStyled src={`${client?.raw_user_meta_data?.imageUrl || ''}`} alt='Profile Pic'/>
                    </Box>
                  </CardContent>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нэр'
                          placeholder='Нэр'
                          value={`${client?.raw_user_meta_data?.firstName || ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Овог'
                          placeholder='Овог'
                          value={`${client?.raw_user_meta_data?.lastName || ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='email'
                          label='И-Мэйл'
                          value={`${client?.raw_user_meta_data?.email || ''}`}
                          placeholder='И-Мэйл'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Нас'
                          placeholder='Нас'
                          value={`${client?.raw_user_meta_data?.age || ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Утасны дугаар'
                          value={`${client?.raw_user_meta_data?.phoneNumber || ''}`}
                          placeholder='Утасны дугаар'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Гэрийн хаяг'
                          placeholder='Гэрийн хаяг'
                          value={`${client?.raw_user_meta_data?.address || ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Хүйс'
                          placeholder='Хүйс'
                          value={`${client?.raw_user_meta_data?.gender ? client?.raw_user_meta_data?.gender === 'male' ? 'Эр' : 'Эм' : ''}`}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Регистрийн дугаар'
                          placeholder='Регистрийн дугаар'
                          value={`${client?.raw_user_meta_data?.ssn || ''}`}
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
                          value={uzleg?.['uzleg_date']}
                          onChange={e => {setUzleg({...uzleg, date: e.target.value})}}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Эмчийн үзлэг'
                          placeholder='Эмчийн үзлэг'
                          value={uzleg?.['emchiin_uzleg']}
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
                        <Button variant='contained' sx={{mr: 4}}>
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
                        <Button variant='contained' sx={{mr: 4}}>
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
      case 3:
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
                        <Button variant='contained' sx={{mr: 4}}>
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
