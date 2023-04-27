// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Home',
    path: '/doctor',
    icon: 'mdi:doctor-outline',
    role: 'doctor'
  },
  {
    title: 'Second Page',
    path: '/second-page',
    icon: 'mdi:email-outline',
    role: 'nurse'
  },
  {
    path: '/nurse',
    title: 'Access Control',
    icon: 'mdi:shield-outline',
    role: 'doctor'
  }
]

export default navigation
