import { useEffect, useState } from "react"
import { TableTr } from "./TableTr"

export  function InvoicesTable() {
  const [formFields, setFormFields] = useState([])

  useEffect(() => {
    const localformFields = JSON.parse(localStorage.getItem("formFields")) || []
    setFormFields([
      ...formFields,
      ...localformFields
    ])
  }, [])

  return (
    <section className="container px-4 p-20 mx-auto">
      <h2 className="text-lg font-medium text-gray-200">Minhas notas fiscais</h2>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y overflow-x divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr className="flex justify-around">
                    <th scope="col" className="py-3.5 sm:w-1/2  w-32 flex justify-center px-4 text-sm font-normal text-left rtl:text-right text-gray-200">
                      <p>Cliente</p>
                    </th>

                    <th scope="col" className="sm:w-1/2  w-32 flex justify-center py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">
                        Chave de acesso
                    </th>

                    <th scope="col" className="sm:w-1/2  w-32 justify-center flex py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">
                        Endereço
                    </th>

                    <th scope="col" className="sm:w-1/2  w-32 flex justify-center py-3.5 text-sm font-normal text-left rtl:text-right text-gray-200">
                        Editar / Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
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