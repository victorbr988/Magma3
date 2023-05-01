import Link from 'next/link';
import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';


export function ModalDownload({ visible = false, setModalVisible}) {
  const [numberKeyAccess, setNumberKeyAccess] = useState("")

  function handleSetNumberKeyAccess(event) {
    setNumberKeyAccess(event.target.value)
  }

  return (
    visible && (
      <div className="fixed bg-black/75 flex justify-center items-center min-h-screen w-full">
        <div className="p-10 sm:w-96 bg-white w-full rounded flex flex-col gap-10 shadow-lg">
          <input value={numberKeyAccess} onChange={handleSetNumberKeyAccess} placeholder='Chave de acesso' className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
          <div className="flex gap-10 justify-center">
            <button 
              onClick={() => setModalVisible(false)}
              type="button"
              className="text-md font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <Link 
              type="button"
              href={`/invoice?key_access=${numberKeyAccess}`}
              onClick={() => {
                // const currentFormField = JSON.parse(localStorage.getItem("formFields")) || []
                // const invoice = currentFormField.find((data) => data.key_access === numberKeyAccess)
                // Invoicepdf(invoice)
                setModalVisible(false)
              }}
              className="rounded-md items-center flex gap-3 bg-indigo-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Baixar
              <FiDownload className='text-lg' />
            </Link>
          </div>
        </div>
      </div>
    )
  )
}