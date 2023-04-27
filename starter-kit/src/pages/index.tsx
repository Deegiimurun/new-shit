import {useAuth} from "../hooks/useAuth";
import {useRouter} from "next/router";
import {useEffect} from "react";
import Spinner from "../@core/components/spinner";

const Home = () => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.user && router.route === '/') {
      router.replace(`${auth.user.user_metadata.role}`)
    }
  }, [auth.user, router])

  return <Spinner sx={{ height: '100%' }} />
}

export default Home
