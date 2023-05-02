import { useEffect, useState } from "react"
import { TableTr } from "./TableTr"
import axios from "axios"
import { toast } from "react-hot-toast"

export function InvoicesTable({ setModalVisible }) {
  const [formFields, setFormFields] = useState([])

  useEffect(() => {    
    async function getAllinvoices() {
      try {
        const url = 'https://localhost:7012/api/v1/notas-fiscais/buscar-todas'
        const totalInvoices = await axios.get(url)
        setFormFields(totalInvoices.data)
      } catch(err) {
        console.log(err)
      }
    }
    getAllinvoices()
  }, [])

  return (
    <section className="container px-4 p-20 shadow-2xl rounded-2xl border-2 border-gray-200 mx-auto">
      <h2 className="text-lg font-medium text-gray-900">Minhas notas fiscais</h2>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <button
              onClick={() => setModalVisible(true)}
              className="rounded-md mb-5 bg-indigo-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Download
            </button>
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              
              <table className="min-w-full divide-y overflow-x divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-400">
                  <tr className="flex justify-around">
                    <th scope="col" className="py-3.5 sm:w-1/2  w-32 flex justify-center px-4 text-md  font-normal text-left rtl:text-right text-gray-900">
                      <p>Cliente</p>
                    </th>

                    <th scope="col" className="sm:w-1/2  w-32 flex justify-center py-3.5 text-md font-normal text-left rtl:text-right text-gray-900">
                        Chave de acesso
                    </th>

                    <th scope="col" className="sm:w-1/2  w-32 justify-center flex py-3.5 text-md font-normal text-left rtl:text-right text-gray-900">
                        Celular
                    </th>

                    <th scope="col" className="sm:w-1/2  w-32 flex justify-center py-3.5 text-md font-normal text-left rtl:text-right text-gray-900">
                        Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100 divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-100">
                  {
                    formFields.map((invoice) => <TableTr key={invoice.key_access} data={invoice} />)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  </section>
  )
}