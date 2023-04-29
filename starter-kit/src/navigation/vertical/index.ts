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
    {
      title: 'Нүүр',
      path: '/doctor/home',
      icon: 'mdi:file-document-box',
      role: 'doctor'
    },
    {
      title: 'Бүх өвчтөн',
      path: '/doctor/all_patient',
      icon: 'mdi:clock-outline',
      role: 'doctor'
    },
    {
      title: 'Цаг авсан өвчтөн',
      path: '/doctor/appointment_patient',
      icon: 'mdi:file-document-box',
      role: 'doctor'
    },

  ]
}

export default navigation
