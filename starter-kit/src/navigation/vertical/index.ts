// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Нүүр хуудас',
      path: '/client',
      icon: 'mdi:doctor-outline',
      role: 'client'
    },
    {
      title: 'Хэрэглэгчийн тохиргоо',
      path: '/client/account-settings',
      icon: 'mdi:doctor-outline',
      role: 'client'
    },
    {
      title: 'Цаг захиалах',
      path: '/client/appointment',
      icon: 'mdi:email-outline',
      role: 'client'
    },
    {
      title: 'Хариу харах',
      path: '/client/test-result',
      icon: 'mdi:email-outline',
      role: 'client'
    },
  ]
}

export default navigation
