import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'highlight.js/styles/github-dark.min.css'
import '@/assets/css/md.scss'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/set-theme"
import Link from "next/link"
import { CatIcon, HomeIcon, MenuIcon, MessagesSquareIcon, UserIcon } from '@/components/layout-icon'
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "迁徒博客",
  description: "记录一些开发文章之类",
};

function Component() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white dark:bg-gray-950 shadow fixed z-10 w-full top-0">
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-64" side="right">
            <div className="grid gap-4 p-4">
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="/"
              >
                <HomeIcon className="h-5 w-5" />
                首页
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                <UserIcon className="h-5 w-5" />
                我的
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                <CatIcon className="h-5 w-5" />
                分类
              </Link>
              <Link
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                <MessagesSquareIcon className="h-5 w-5" />
                消息
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full animate-pulse" size="icon" variant="ghost">
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/github.jpg"
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>我的帐户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>账号设置</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Component />
          <main className="mt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
