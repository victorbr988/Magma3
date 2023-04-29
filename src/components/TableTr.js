import {FiEdit2, FiTrash2} from "react-icons/fi"

export function TableTr({ data }) {
  return (
    <tr className="flex justify-around">
      <td className="sm:w-1/2 w-32 flex justify-center py-4 text-sm font-medium text-gray-200 whitespace-nowrap">
        {data.client}
      </td>
      <td className="sm:w-1/2 w-32 flex justify-center py-4 text-sm font-normal text-gray-200 whitespace-nowrap">
        {data.key_access}
      </td>
      <td className="sm:w-1/2 w-32 flex justify-center py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.neighborhood}</td>
      <td className="sm:w-1/2 w-32 flex justify-center py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <div className="flex gap-5">
          <FiEdit2 
            className="text-green-600 text-xl cursor-pointer"
          />
          <FiTrash2 
            className="text-red-600 text-xl cursor-pointer"
          />
        </div>
      </td>
    </tr>
  )
}