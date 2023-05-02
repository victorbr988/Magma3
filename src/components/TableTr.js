import Link from "next/link"
import { FiSave, FiTrash2} from "react-icons/fi"

export function TableTr({ data }) {
  return (
    <tr className="flex justify-around">
      <td className="sm:w-1/2 w-32 flex justify-center items-center py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
        {data.nomeCliente}
      </td>
      <td className="sm:w-1/2 w-32 flex justify-center items-center py-4 text-sm font-normal text-gray-900 whitespace-nowrap">
        {data.chaveAcesso}
      </td>
      <td className="sm:w-1/2 w-32 flex justify-center items-center py-4 text-sm text-gray-900 whitespace-nowrap">{data.phone}</td>
      <td className="sm:w-1/2 w-32 flex justify-center py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <div className="flex gap-5 items-center">
          <Link 
            href={`invoice?key_access=${data.chaveAcesso}`}
          >
           <FiSave 
            className="text-blue-600  text-xl" 
           />
          </Link>
          <FiTrash2 
            className="text-red-600 text-xl cursor-pointer"
          />
        </div>
      </td>
    </tr>
  )
}