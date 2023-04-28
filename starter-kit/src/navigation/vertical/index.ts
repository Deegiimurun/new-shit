// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Нүүр хуудас',
      path: '/client/home',
      icon: 'mdi:home-outline',
      role: 'client'
    },
    {
      title: 'Тохиргоо',
      path: '/client/account-settings',
      icon: 'mdi:settings-outline',
      role: 'client'
    },
    {
      title: 'Цаг захиалах',
      path: '/client/appointment',
      icon: 'mdi:clock-outline',
      role: 'client'
    },
    {
      title: 'Хариу харах',
      path: '/client/test-result',
      icon: 'mdi:file-document-box',
      role: 'client'
    },
  ]
}

export default navigation
