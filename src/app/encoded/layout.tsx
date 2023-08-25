import Navbar from "@/components/navbar.module"

export const metadata = {
  title: 'EDMC: encoded materials',
  description: 'Elite Dangerous Materials Convertion',
}
export default function SubLayout({
    children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
        <Navbar/>
        <main>
          {children}
        </main>
    </>
  )
}
