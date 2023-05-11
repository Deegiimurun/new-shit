import { useState, ElementType, ChangeEvent, FormEvent, useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import { LoadingButton } from '@mui/lab'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useAuth } from '../../hooks/useAuth'

interface Data {
  firstName: string
  lastName: string
  email: string
  age: string
  phoneNumber: string
  address: string
  gender: string
  ssn: string
  imageUrl: string
  role: string
}

const initialData: Data = {
  firstName: '',
  lastName: '',
  email: '',
  age: '',
  phoneNumber: '',
  address: '',
  gender: '',
  ssn: '',
  imageUrl: '',
  role: ''
}

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: 4,
  marginRight: theme.spacing(5)
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))
const Settings = () => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Data>(initialData)

  const supabase = useSupabaseClient()
  const auth = useAuth()

  useEffect(() => {
    setFormData({ ...initialData, ...(auth.user?.user_metadata as Data) })
  }, [auth])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(!loading)

    await supabase.auth.updateUser({
      data: formData
    })

    setLoading(loading)
  }

  const handleInputImageChange = async (file: ChangeEvent) => {
    const { files } = file.target as HTMLInputElement
    const fileName = String(Math.floor(Math.random() * 10000000))

    if (!files || files.length === 0) return

    await supabase.storage.from('image').upload(fileName, files[0], {
      cacheControl: '3600',
      upsert: false
    })

    const { data } = supabase.storage.from('image').getPublicUrl(fileName)

    handleFormChange('imageUrl', data.publicUrl)
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <form noValidate autoComplete='off' onSubmit={onSubmit}>
            <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ImgStyled src={formData.imageUrl} alt='Profile Pic' />
                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Зураг оруулах
                    <input
                      hidden
                      type='file'
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
                    PNG JPEG өргөтгөлтэй зураг байна.
                  </Typography>
                </div>
              </Box>
            </CardContent>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Нэр'
                    placeholder='Нэр'
                    value={formData.firstName}
                    onChange={e => {
                      if (e.target.value.match('^[а-яөүА-ЯӨҮ]*$')) handleFormChange('firstName', e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Овог'
                    placeholder='Овог'
                    value={formData.lastName}
                    onChange={e => {
                      if (e.target.value.match('^[а-яөүА-ЯӨҮ]*$')) handleFormChange('lastName', e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='email'
                    label='И-Мэйл'
                    value={formData.email}
                    placeholder='И-Мэйл'
                    onChange={e => handleFormChange('email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Нас'
                    placeholder='Нас'
                    value={formData.age}
                    onChange={e => {
                      if (e.target.value.match('^[0-9]*$')) handleFormChange('age', e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='text'
                    label='Утасны дугаар'
                    value={formData.phoneNumber}
                    placeholder='Утасны дугаар'
                    onChange={e => {
                      if (e.target.value.match('^[0-9]{0,8}$')) handleFormChange('phoneNumber', e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Гэрийн хаяг'
                    placeholder='Гэрийн хаяг'
                    value={formData.address}
                    onChange={e => handleFormChange('address', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Хүйс</InputLabel>
                    <Select
                      label='Хүйс'
                      value={formData.gender}
                      onChange={e => handleFormChange('gender', e.target.value)}
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
                    value={formData.ssn}
                    onChange={e => {
                      if (e.target.value.match('^[а-яөүА-ЯӨҮ]{0,2}[0-9]{0,8}$')) handleFormChange('ssn', e.target.value)
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton loading={loading} size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
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
}

export default Settings
