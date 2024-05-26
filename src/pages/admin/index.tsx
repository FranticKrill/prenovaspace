import AdminLayout from '@/layouts/admin.layout'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function Index() {
const router = useRouter()

  useEffect(() => {
    router.push("/admin/orders")
  }, [])

  return (
    <AdminLayout>
        Admin layout
    </AdminLayout>
  )
}
