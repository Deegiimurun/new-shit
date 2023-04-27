const getHomeRoute = (role: string) => {
  if (role === 'client') return '/client'
  if (role === 'nurse') return '/nurse'
  else return '/doctor'
}

export default getHomeRoute
