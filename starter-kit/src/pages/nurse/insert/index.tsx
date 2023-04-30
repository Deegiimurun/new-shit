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
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {LoadingButton} from "@mui/lab";

const steps = [
  {
    title: 'Өвчтөн',
    icon: <Icon width='56px' height='56px' icon='mdi:account-check'/>
  },
  {
    title: 'Амин үзүүлэлт',
    icon: <Icon width='56px' height='56px' icon='mdi:clipboard-pulse-outline'/>
  },
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
  const [aminUzuulelt, setAminUzuulelt] = useState<any>({})
  const [aminUzuuleltLoading, setAminUzuuleltLoading] = useState<any>(false)
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
      const checkAppointment = async () => {
        if (!router.query['appointment-id']) return

        const appointmentResult = await supabase.from('tsag_burtgel').select('*').eq('id', router.query['appointment-id'])
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

    const initAminUzuulelt = async () => {
      if (!appointment['amin_uzuulelt_id']) {
        const {data} = await supabase
          .from('amin_uzuulelt')
          .insert({}).select('*');
        if (!data) return;
        await supabase.from('tsag_burtgel').update({'amin_uzuulelt_id': data[0]['id']}).eq('id', appointment['id'])
        setAminUzuulelt(data[0])
      } else {
        const {data} = await supabase
          .from('amin_uzuulelt')
          .select()
          .eq('id', appointment['amin_uzuulelt_id']);
        if (!data) return;
        setAminUzuulelt(data[0])
      }
    }

    initAminUzuulelt()
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
                          value={aminUzuulelt?.['uhaan_sanaa'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, uhaan_sanaa: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Пульс'
                          placeholder='Пульс'
                          value={aminUzuulelt?.['pulis'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, pulis: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Амьсгалын тоо'
                          value={aminUzuulelt?.['amisgaliin_too'] || ''}
                          placeholder='Амьсгалын тоо'
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, amisgaliin_too: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Биеийн температур'
                          value={aminUzuulelt?.['biyiin_temperature'] || ''}
                          placeholder='Биеийн температур'
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, biyiin_temperature: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт дээд'
                          placeholder='Баруун даралт дээд'
                          value={aminUzuulelt?.['baruun_daralt_deed'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, baruun_daralt_deed: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт доод'
                          value={aminUzuulelt?.['baruun_daralt_dood'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, baruun_daralt_dood: e.target.value})
                          }}
                          placeholder='Баруун даралт доод'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт дундаж'
                          placeholder='Баруун даралт дундаж'
                          value={aminUzuulelt?.['baruun_daralt_dundaj'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, baruun_daralt_dundaj: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт нэмэлт'
                          placeholder='Баруун даралт нэмэлт'
                          value={aminUzuulelt?.['baruun_daralt_nemelt'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, baruun_daralt_nemelt: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт дээд'
                          placeholder='Зүүн даралт дээд'
                          value={aminUzuulelt?.['zuun_daralt_deed'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, zuun_daralt_deed: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт доод'
                          placeholder='Зүүн даралт доод'
                          value={aminUzuulelt?.['zuun_daralt_dood'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, zuun_daralt_dood: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Зүүн даралт дундаж'
                          placeholder='Зүүн даралт дунда'
                          value={aminUzuulelt?.['zuun_daralt_dundaj'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, zuun_daralt_dundaj: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Зүүн даралт нэмэлт'
                          placeholder='Зүүн даралт нэмэлт'
                          value={aminUzuulelt?.['zuun_daralt_nemelt'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, zuun_daralt_nemelt: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Сатураци'
                          placeholder='Сатураци'
                          value={aminUzuulelt?.['saturatsi'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, saturatsi: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өндөр'
                          placeholder='Өндөр'
                          value={aminUzuulelt?.['undur'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, undur: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Жин'
                          placeholder='Жин'
                          value={aminUzuulelt?.['jin'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, jin: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='БЖИ'
                          placeholder='БЖИ'
                          value={aminUzuulelt?.['bji'] || ''}
                          onChange={e => {
                            setAminUzuulelt({...aminUzuulelt, bji: e.target.value})
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <LoadingButton loading={aminUzuuleltLoading} variant='contained' sx={{mr: 4}}
                                       onClick={async () => {
                                         setAminUzuuleltLoading(true);
                                         const a = await supabase.from('amin_uzuulelt').update(aminUzuulelt).eq('id', aminUzuulelt.id)
                                         console.log(a)
                                         setAminUzuuleltLoading(false);
                                       }}
                        >
                          Хадгалах
                        </LoadingButton>
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
