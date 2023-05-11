// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
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
      title: 'Цаг авсан өвчтөн',
      path: '/doctor/appointment_patient',
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
      title: 'Үзлэг бүртгэх',
      path: '/doctor/insert',
      icon: 'mdi:clock-outline',
      role: 'doctor'
    },
    {
      title: 'Бүх өвчтөн',
      path: '/nurse/all_patient',
      icon: 'mdi:clock-outline',
      role: 'nurse'
    },
    {
      title: 'Цаг авсан өвчтөн',
      path: '/nurse/appointment_patient',
      icon: 'mdi:file-document-box',
      role: 'nurse'
    },
    {
      title: 'Бүртгэх',
      path: '/nurse/insert',
      icon: 'mdi:clock-outline',
      role: 'nurse'
    },

    {
      title: 'Тайлан',
      path: '/doctor/report',
      icon: 'mdi:clock-outline',
      role: 'doctor'
    },
    {
      title: 'Тайлан',
      path: '/nurse/report',
      icon: 'mdi:clock-outline',
      role: 'nurse'
    }
  ]
}

export default navigation
