// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/doctor',
      icon: 'mdi:doctor-outline',
      role: 'client'
    },
    {
      title: 'Settings',
      path: '/client/account-settings',
      icon: 'mdi:doctor-outline',
      role: 'client'
    },
    {
      title: 'Second Page',
      path: '/second-page',
      icon: 'mdi:email-outline',
      role: 'client'
    },
    {
      path: '/nurse',
      title: 'Access Control',
      icon: 'mdi:shield-outline',
      role: 'client'
    }
  ]
}

export default navigation
