// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/doctor',
      icon: 'mdi:doctor-outline',

    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline',
    },
    {
      path: '/nurse',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
    }
  ]
}

export default navigation
