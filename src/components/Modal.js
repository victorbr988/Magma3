import toast from 'react-hot-toast';

export function Modal({ visible = false, data, setModalVisible}) {
  return (
    visible && (
      <div className="fixed bg-black/75 flex justify-center items-center min-h-screen w-full">
        <div className="p-10 sm:w-96 bg-white w-full rounded flex flex-col gap-10 shadow-lg">
          <h2 className="text-gray-900 text-2xl">Deseja confirmar o envio dos dados?</h2>
          <div className="flex gap-10 justify-center">
            <button 
              onClick={() => setModalVisible(false)}
              type="button" 
              className="text-md font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button 
              type="button"
              onClick={() => {
                const currentFormField = JSON.parse(localStorage.getItem("formFields")) || []
                localStorage.setItem("formFields", JSON.stringify([...currentFormField,...data]))
                toast.success("Dados salvos com sucesso")
                setModalVisible(false)
              }}
              className="rounded-md bg-indigo-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  )
}