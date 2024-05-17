'use client'
import { useParams } from "next/navigation"
import { useRequest } from "ahooks"
import { getArticleDetail } from '@/app/api'
import { markdownParser } from '@/utils'
import Image from "next/image";
import { Button } from '@/components/ui/button'
import moment from 'moment'
import { useTheme } from "next-themes"

export default function Detail() {
  const params = useParams()
  let id = params?.detail?.[1] as string || 1
  const { data, error, loading } = useRequest(async () => await getArticleDetail(id))
  const { theme } = useTheme()
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>error...</div>
  }
  return (
    <div className="bg-slate-100 dark:bg-black">
      <header className="bg-white dark:bg-gray-800 mb-4 py-2">
        <h2 className="text-2xl pl-5 mb-4">{data.data[0]?.title}</h2>
        <div className="flex items-center justify-between px-5">
          <div className="flex">
            <Image
              src="/github.jpg"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-4">
              <div className="text-sm">{data.data[0].user}</div>
              <div className="text-xs">
                {moment(data.data[0].date).format("YYYY-MM-DD HH:mm:ss")}
              </div>
            </div>
          </div>
          <Button color='primary'>
            关注
          </Button>
        </div>
      </header>
      <div className={`markdown-body bg-white dark:bg-gray-800 p-5 ${theme === 'dark' ? '__dark' : ''}`}>
        { data && <div dangerouslySetInnerHTML={{ __html: markdownParser.render(data.data[0].text) }} /> }
      </div>
    </div>

  )
}