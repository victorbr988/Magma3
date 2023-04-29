import { Header } from "@/components/Header";
import { InvoicesTable } from "@/components/InvoicesTable";
import React, { Fragment } from "react";


export default function Invoices() {
  return (
    <Fragment>
      <Header />
      <main className='sm:p-20 w-full p-10 min-h-screen flex justify-center'>
        <InvoicesTable />
      </main>
    </Fragment>
  )
}