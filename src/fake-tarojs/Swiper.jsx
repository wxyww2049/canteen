import { useEffect, useState } from "react"
import { Swiper } from "swiper/react"
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

SwiperCore.use([Pagination])

export default function TaroSwiper(props) {
  const [page, setPage] = useState(0)

  return (
    <Swiper pagination loop className={props.className} children={props.children} />
  )
}
