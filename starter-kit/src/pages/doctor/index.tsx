import {useRouter} from "next/router";

export default function Doctor() {
  const router = useRouter();

  router.push('/doctor/home')
}
