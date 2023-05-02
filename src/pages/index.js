import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import { Modal } from '@/components/Modal'
import { Fragment, useState } from 'react'
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataList, setDataList] = useState([]);

  return (
    <Fragment>
      <Header />
      <main className='sm:p-20 min-h-screen flex justify-center'>
        <Form setModalVisible={setModalVisible} setDataList={setDataList} />
        <Modal setModalVisible={setModalVisible} visible={modalVisible} data={dataList} />
      </main>
      <Toaster />
    </Fragment>
  )
}
