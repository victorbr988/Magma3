import { Form } from '@/components/Form'
import { Header } from '@/components/Header'
import { Modal } from '@/components/Modal'
import { Fragment, useState } from 'react'
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataList, setDataList] = useState({});

  function generateClientId() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let chave = '';
    for (let i = 0; i < 6; i++) {
      chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return chave
  }

  const formatDataToSaveOnDb = {
    dataCompra: dataList.buy_date,
    notaFiscal: {
      numeroNota: dataList.invoiceNumber,
      chaveAcesso: dataList.key_access,
      dataEmissao: dataList.emission_date,
    },
    client: {
      nomeCliente: dataList.client,
      cod_client: 'e6b4c469-6d09-4181-8af4-50251113052f'
    },
    endereco: {
      cep: dataList.zip_code,
      uf: dataList.state_uf,
      cidade: dataList.city,
      bairro: dataList.neighborhood,
      logradouro: dataList.district,
      numero: dataList.home_number
    },
    celular: {
      celularNumero: dataList.phone
    },
    produto: {
      descricao: dataList.product,
      produtoPreco: dataList.product_value
    }
  }

  return (
    <Fragment>
      <Header />
      <main className='sm:p-20 min-h-screen flex justify-center'>
        <Form setModalVisible={setModalVisible} setDataList={setDataList} />
        <Modal setModalVisible={setModalVisible} visible={modalVisible} data={formatDataToSaveOnDb} />
      </main>
      <Toaster />
    </Fragment>
  )
}
