import {useRouter} from "next/router";

export default function Client() {
  const router = useRouter();

  router.push('/client/appointment')
}
