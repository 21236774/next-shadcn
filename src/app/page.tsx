"use client"
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { EyeIcon, MessageCircleIcon, HeartIcon } from "@/components/layout-icon"
import { getCategoryData, getArticleData } from '@/app/api'
import { useRequest } from "ahooks"
import { Skeleton } from "@/components/ui/skeleton"
import moment from 'moment'

const ListBox = ({ item, toDtetail }: { item: Articles.Item, toDtetail: (id: number | string) => void }) => {
  return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden relative pb-6" onClick={() => {toDtetail(item.id)}}>
        <div className="p-4 md:p-6 pb-8">
          <a
            className="block mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100 hover:underline"
            href="#"
          >
            { item.title }
          </a>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            { item.abstract }
          </p>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-4">
            <img alt="Author" className="w-6 h-6 rounded-full mr-2" src="/github.jpg"/>
            <span>{ item.user }</span>
            <span className="mx-2">·</span>
            <span>{ moment(item.date).format("YYYY-MM-DD HH:mm:ss") }</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <HeartIcon className="w-5 h-5 mr-1 text-red-500"/>
              <span>3</span>
            </div>
            <div className="flex items-center">
              <MessageCircleIcon className="w-5 h-5 mr-1 text-blue-500"/>
              <span>2</span>
            </div>
            <div className="flex items-center">
              <EyeIcon className="w-5 h-5 mr-1 text-gray-500"/>
              <span>1K</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 flex items-center space-x-2 absolute bottom-0 w-full">
          { item.tagArr.map((el: string) => (
            <a
              key={el}
              className="inline-block px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-400 text-xs font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
              href="#"
            >
              { el }
            </a>
          ))}
        </div>
      </div>
  )
}

export default function Component() {
  const [activeIndex, setActiveIndex] = useState(0)
  const {data: categoryList, loading} = useRequest(getCategoryData)
  const router = useRouter()
  const {runAsync} = useRequest(getArticleData, {
    manual: true
  })

  const getArticle = (id: number) => {
    runAsync(id).then(({code, data}: ApiData<Articles.Category<Articles.Post>>) => {
      if (code === 200) {
        const posts = data.posts
        if (posts) {
          const articlesItem: Articles.Item[] = posts.map((el) => {
            return {...el.articles, categoryId: el.categoryId}
          })
          articlesItem.forEach(el => {
            el.tagArr = []
            categoryList.data.forEach((item: Articles.Category<Articles.Item>) => {
              const tagArr = el.tags.split(',')
              const obj = tagArr.find((el) => item.id === Number(el))
              if (obj) el.tagArr?.push(item.tagName)
              if (!item?.posts?.length) {
                item.posts = []
              }
              if (el.categoryId === item.id) item.posts?.push(el)
            })
          })
          console.log(categoryList)
        }
      }
    })
  }

  const tabChange = (key: string | number) => {
    const val = Number(key)
    const obj = categoryList.data.find((el: Articles.Category<string>) => el.id === val)
    if(!obj?.posts?.length) getArticle(val)
    setActiveIndex(val)
  }


  const toDtetail = (id: string | number) => {
    router.push(`/detail/${id}`)
  }

  useEffect(() => {
    if (!loading) {
      const item = categoryList?.data.find((obj: any) => obj.disabled !== 0)
      if (item) {
        setActiveIndex(item.id)
        getArticle(item.id)
      }
    }
  }, [loading])

  if (loading) {
    return (
      <>
        <Skeleton className="h-12 mt-20 mx-4"/>
        <Skeleton className="h-32 mt-6 mx-4"/>
        <Skeleton className="h-32 mt-6 mx-4"/>
        <Skeleton className="h-32 mt-6 mx-4"/>
        <Skeleton className="h-32 mt-6 mx-4"/>
        <Skeleton className="h-32 mt-6 mx-4"/>
      </>
    )
  }
  return (
    <div className="bg-gray-100 dark:bg-gray-800 pb-8 pt-16 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <Tabs className="mb-6 md:mb-8 lg:mb-10" defaultValue={categoryList?.data ? categoryList?.data?.[0].id : '0'}
              onValueChange={tabChange}>
          <div className="py-4 fixed top-16 w-full left-0 px-4 sm:px-6 md:px-8 lg:px-10 py-4 z-10 bg-muted">
            <TabsList className="flex justify-start overflow-y-hidden">
              {
                categoryList?.data && categoryList.data.map((item: any) => <TabsTrigger
                  key={item.id}
                  className="inline-block px-4 py-2 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 mr-4 rounded-md"
                  value={item.id}
                >
                  {item.tagName}
                </TabsTrigger>)
              }
            </TabsList>
          </div>
          {
            categoryList?.data && categoryList.data.map((item: any) => (
              <TabsContent value={item.id} key={item.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 mt-6">
                  {item?.posts ? item?.posts.map((el: Articles.Item) => <ListBox key={el.id} item={el} toDtetail={toDtetail} />) : null}
                </div>
              </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </div>
)
}