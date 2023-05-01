import { Header } from "@/components/Header";
import { InvoicesTable } from "@/components/InvoicesTable";
import { ModalDownload } from "@/components/ModalDownload";
import React, { Fragment, useState } from "react";


export default function Invoices() {
  const [visible, setModalVisible] = useState(false);
  return (
    <Fragment>
      <Header />
      <main className='sm:p-20 w-full p-10 min-h-screen flex justify-center overflow-y-auto'>
        <InvoicesTable setModalVisible={setModalVisible} />
        <ModalDownload visible={visible} setModalVisible={setModalVisible} />
      </main>
    </Fragment>
  )
}