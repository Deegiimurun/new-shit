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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {useRouter} from "next/router";
import {useSupabaseClient} from "@supabase/auth-helpers-react";

const steps = [
  {
    title: 'Амин үзүүлэлт',
    icon: <Icon width='56px' height='56px' icon='mdi:clipboard-pulse-outline'/>
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

const CheckoutWizard = () => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [appointment, setAppointment] = useState<any>()
  const [aminUzuulelt, setAminUzuulelt] = useState<any>({})
  const [uzleg, setUzleg] = useState<any>({})
  const [onosh, setOnosh] = useState<any>({})
  const [emchilgee, setEmchilgee] = useState<any>({})
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
      const checkAppointment = async () => {
        if (!router.query['appointment-id']) return

        const appointmentResult = await supabase.from('tsag_burtgel').select('*').eq('id', router.query['appointment-id'])
        if (!appointmentResult.data) return

        setAppointment(appointmentResult.data[0])
      }

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
        setEmchilgee(data[0])
      } else {
        const {data} = await supabase
          .from('emchilgee')
          .select()
          .eq('id', appointment['emchilgee_id']);
        if (!data) return;
        setEmchilgee(data[0])
      }
    }

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

    initUzleg()
    initOnosh()
    initEmchilgee()
    initAminUzuulelt()
  }, [appointment]);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (<Grid height='100%' container spacing={6}>
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
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Пульс'
                          placeholder='Пульс'
                          value={aminUzuulelt?.['pulis'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Амьсгалын тоо'
                          value={aminUzuulelt?.['amisgaliin_too'] || ''}
                          placeholder='Амьсгалын тоо'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Биеийн температур'
                          value={aminUzuulelt?.['biyiin_temperature'] || ''}
                          placeholder='Биеийн температур'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт дээд'
                          placeholder='Баруун даралт дээд'
                          value={aminUzuulelt?.['baruun_daralt_deed'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт доод'
                          value={aminUzuulelt?.['baruun_daralt_dood'] || ''}
                          placeholder='Баруун даралт доод'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт дундаж'
                          placeholder='Баруун даралт дундаж'
                          value={aminUzuulelt?.['baruun_daralt_dundaj'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Баруун даралт нэмэлт'
                          placeholder='Баруун даралт нэмэлт'
                          value={aminUzuulelt?.['baruun_daralt_nemelt'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт дээд'
                          placeholder='Зүүн даралт дээд'
                          value={aminUzuulelt?.['zuun_daralt_deed'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зүүн даралт доод'
                          placeholder='Зүүн даралт доод'
                          value={aminUzuulelt?.['zuun_daralt_dood'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Зүүн даралт дундаж'
                          placeholder='Зүүн даралт дунда'
                          value={aminUzuulelt?.['zuun_daralt_dundaj'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Зүүн даралт нэмэлт'
                          placeholder='Зүүн даралт нэмэлт'
                          value={aminUzuulelt?.['zuun_daralt_nemelt'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Сатураци'
                          placeholder='Сатураци'
                          value={aminUzuulelt?.['saturatsi'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өндөр'
                          placeholder='Өндөр'
                          value={aminUzuulelt?.['undur'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Жин'
                          placeholder='Жин'
                          value={aminUzuulelt?.['jin'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='БЖИ'
                          placeholder='БЖИ'
                          value={aminUzuulelt?.['bji'] || ''}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </form>
              </Card>
            </Grid>
          </Grid>)
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
                          label='Үзлэг хийгдсэн огноо'
                          placeholder='Үзлэг хийгдсэн огноо'
                          value={uzleg?.['uzleg_date'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Эмчийн үзлэг'
                          placeholder='Эмчийн үзлэг'
                          value={uzleg?.['emchiin_uzleg'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өвчний учир амбулатори'
                          value={uzleg?.['uvchnii_uchir'] || ''}
                          placeholder='Өвчний учир амбулатори'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Өвчлөлтэй эсэх</InputLabel>
                          <Select
                            label='Өвчлөлтэй эсэх'
                            value={uzleg?.['uvchlultei_eseh'] || ''}
                          >
                            <MenuItem value='true'>Тийм</MenuItem>
                            <MenuItem value='false'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Үзлэгийн төрөл'
                          placeholder='Үзлэгийн төрөл'
                          value={uzleg?.['uzlegiin_turul'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Үндсэн онош'
                          value={uzleg?.['undsen_onosh'] || ''}
                          placeholder='Үндсэн онош'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өвчний шалтгаан'
                          placeholder='Өвчний шалтгаан'
                          value={uzleg?.['uvchnii_shaltgaan'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өвчлөл'
                          placeholder='Өвчлөл'
                          value={uzleg?.['uvchlul'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Дээд шатлалд илгээсэн эсэх</InputLabel>
                          <Select
                            label='Дээд шатлалд илгээсэн эсэх'
                            value={uzleg?.['deed_shatlal'] || ''}
                          >
                            <MenuItem value='true'>Тийм</MenuItem>
                            <MenuItem value='false'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Хийгдсэн ажилбар'
                          placeholder='Хийгдсэн ажилбар'
                          value={uzleg?.['hiigdsen_ajilbar'] || ''}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Хүчирхийлэлд өртсөн эсэх</InputLabel>
                          <Select
                            label='Хүчирхийлэлд өртсөн эсэх'
                            value={uzleg?.['huchirhiilel'] || ''}

                          >
                            <MenuItem value='true'>Тийм</MenuItem>
                            <MenuItem value='false'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Хөдөлмөр алдалтын хоног'
                          placeholder='Хөдөлмөр алдалтын хоног'
                          value={uzleg?.['hudulmur_aldalt'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel>Эргэж холбогдох шаардлагатай эсэх</InputLabel>
                          <Select
                            label='Эргэж холбогдох шаардлагатай эсэх'
                            value={uzleg?.['ergej_holbogdoh'] || ''}

                          >
                            <MenuItem value='true'>Тийм</MenuItem>
                            <MenuItem value='false'>Үгүй</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Шалтгаан'
                          placeholder='Шалтгаан'
                          value={uzleg?.['shaltgaan'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12}>
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
                          value={onosh?.['eronhii_turul'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Ерөнхий төрөл код'
                          placeholder='Ерөнхий төрөл код'
                          value={onosh?.['eronhii_turul_kod'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Төрөл'
                          value={onosh?.['turul'] || ''}

                          placeholder='Төрөл'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Төрөл код'
                          placeholder='Төрөл код'
                          value={onosh?.['turul_kod'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Дэд төрөл'
                          value={onosh?.['ded_turul'] || ''}

                          placeholder='Дэд төрөл'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Дэд төрөл код'
                          placeholder='Дэд төрөл код'
                          value={onosh?.['ded_turul_kod'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Өгөгдөл'
                          placeholder='Өгөгдөл'
                          value={onosh?.['ugugdul'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12}>
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
                          value={emchilgee?.['emchilgeenii_too'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Ямар эрхтэнд'
                          placeholder='Ямар эрхтэнд'
                          value={emchilgee?.['yamar_erhtend'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Зай'
                          placeholder='Зай'
                          value={emchilgee?.['zai'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Тун'
                          placeholder='Тун'
                          value={emchilgee?.['tun'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Үргэлжлэх хугацаа'
                          placeholder='Үргэлжлэх хугацаа'
                          value={emchilgee?.['urgeljleh_hugatsaa'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Талбай'
                          placeholder='Талбай'
                          value={emchilgee?.['talbai'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label='Давтамж'
                          placeholder='Давтамж'
                          value={emchilgee?.['davtamj'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          type='text'
                          label='Хэдэн удаа'
                          placeholder='Хэдэн удаа'
                          value={emchilgee?.['heden_udaa'] || ''}

                        />
                      </Grid>
                      <Grid item xs={12}>
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
