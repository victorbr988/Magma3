import axios from "axios";
import { Fragment, useEffect, useState } from "react";

export function Form({ setModalVisible, setDataList }) {

  //storage
  const dataStorage = []

  //state client info
  const [zipCode, setZipcode] = useState("")
  const [stateUf, setStateUf] = useState("")
  const [city, setCity] = useState("")
  const [district, setDistrict] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [phone, setPhone] = useState("");
  const [client, setClient] = useState("");
  const [buyDate, setBuyDate] = useState("");

  //state invoice 
  const [keyAccess, setKeyAccess] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [product, setProduct] = useState("");
  const [productValue, setProductValue] = useState(0)
  const [emissionDate, setEmissionDate] = useState("");

  //state sendData
  const [fields, setFields] = useState({
    client: "",
    zip_code: "",
    state_uf: "",
    city: "",
    district: "",
    neighborhood: "",
    phone: "",
    invoice_number: "",
    buy_date: "",
    key_access: "",
    product: "",
    product_value: 0,
    emission_date: ""
  })

  useEffect(() => {
    function gerarChave() {
      const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let chave = '';
      for (let i = 0; i < 6; i++) {
        chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
      }
      setKeyAccess(chave);
      setFields({
        ...fields,
        key_access: chave
      })
    }

    gerarChave()
  }, [])

  function maskToInvoiceNumber(event) {
    const regex = /^[0-9]{0,12}$/; // expressão regular para permitir apenas números de até 12 dígitos
    const value = event.target.value;
    if (regex.test(value)) { // testa se o valor inserido está de acordo com a expressão regular
      setInvoiceNumber(value);
      setFields({
        ...fields,
        invoice_number: value
      })
    }
  }

  function handleSetValueProduct(event) {
    setProductValue(event.target.value)
    setFields({
      ...fields,
      product_value: event.target.value
    })
  }
  function handleSetProduct(event) {
    setProduct(event.target.value)
    setFields({
      ...fields,
      product: event.target.value
    })
  }

  function handleSetBuyDate(event) {
    setBuyDate(event.target.value);
    setFields({
      ...fields,
      buy_date: event.target.value
    })
  }

  function handleSetEmissionDate(event) {
    setEmissionDate(event.target.value);
    setFields({
      ...fields,
      emission_date: event.target.value
    })
  }

  function handleSearchAddress(event) {
    let cep = event.target.value;
    cep = cep.replace(/\D/g, ''); // remove todos os caracteres não numéricos
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // adiciona o traço após os primeiros cinco dígitos
    setZipcode(cep)

    if (cep.length === 9) {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((response) => {
        setCity(response.data.localidade)
        setStateUf(response.data.uf)
        setDistrict(response.data.logradouro)
        setNeighborhood(response.data.bairro);
        setFields({
          ...fields,
          city: response.data.localidade,
          state_uf: response.data.uf,
          district: response.data.logradouro,
          neighborhood: response.data.bairro,
          zip_code: cep
        })
      })
    }
  }

  function maskPhoneNumber(event){
    let phone = event.target.value;
    phone = phone.replace(/\D/g, ''); // remove todos os caracteres não numéricos
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2'); // adiciona os parênteses e espaço após o DDD
    phone = phone.replace(/(\d{4,5})(\d)/, '$1-$2'); // adiciona o traço após os próximos quatro ou cinco dígitos
    setPhone(phone);
    setFields({
      ...fields,
      phone,
    })
  };

  function getInputClient(event) {
    setClient(event.target.value)
    setFields({
      ...fields,
      client: event.target.value
    })
  }

  return (
    <Fragment>
      <form className="w-[800px] mt-5">
        <div className="space-y-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-200">Criar nota fiscal</h2>
          <div className="border-b border-gray-50/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-200">Dados do cliente</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="cliente" className="block text-md font-medium leading-6 text-gray-200">Cliente *</label>
                <div className="mt-2">
                  <input type="text" name="cliente" aria-required="true" required value={client} onChange={getInputClient} id="cliente"className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="telefone" className="block text-md font-medium leading-6 text-gray-200">Telefone *</label>
                <div className="mt-2">
                  <input type="text" name="telefone" aria-required="true" required value={phone} onChange={maskPhoneNumber} id="telefone" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="dateBuy" className="block text-md font-medium leading-6 text-gray-200">Data da compra *</label>
                <div className="mt-2">
                  <input id="dateBuy" name="dateBuy" onChange={handleSetBuyDate} value={buyDate} aria-required="true" required type="datetime-local" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md md:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="country" className="block text-md font-medium leading-6 text-gray-200">Código Postal *</label>
                <div className="mt-2">
                  <input id="email" name="email" aria-required="true" required value={zipCode}  onChange={handleSearchAddress} type="email" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="Logradouro" className="block text-md font-medium leading-6 text-gray-200">Logradouro</label>
                <div className="mt-2">
                  <input type="text" name="Logradouro" aria-required="true" required defaultValue={district} id="Logradouro" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-200">City</label>
                <div className="mt-2">
                  <input type="text" name="city" aria-required="true" required id="city" defaultValue={city} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="uf" className="block text-md font-medium leading-6 text-gray-200">UF</label>
                <div className="mt-2">
                  <input type="text" name="uf" aria-required="true" required id="uf" defaultValue={stateUf} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bairro" className="block text-md font-medium leading-6 text-gray-200">Bairro</label>
                <div className="mt-2">
                  <input type="text" name="bairro" aria-required="true" required defaultValue={neighborhood} id="bairro" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-200">Dados da nota fiscal</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-2">
                <label htmlFor="key" className="block text-md font-medium leading-6 text-gray-200">Chave de acesso</label>
                <div className="mt-2">
                  <input type="text" name="key" id="key" defaultValue={keyAccess} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="number" className="block text-md font-medium leading-6 text-gray-200">Número da nota fiscal *</label>
                <div className="mt-2">
                  <input type="text" name="number" id="number" value={invoiceNumber} onChange={maskToInvoiceNumber} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="product" className="block text-md font-medium leading-6 text-gray-200">Produto *</label>
                <div className="mt-2">
                  <input type="text" name="product" value={product} onChange={handleSetProduct} aria-required="true" required id="product" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="value" className="block text-md font-medium leading-6 text-gray-200">Valor do produto *</label>
                <div className="mt-2">
                  <input type="text" name="value" value={ productValue } onChange={handleSetValueProduct} aria-required="true" required id="value"  className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="emission" className="block text-md font-medium leading-6 text-gray-200">Data de Emissão *</label>
                <div className="mt-2">
                  <input type="datetime-local" name="emission" value={emissionDate} onChange={handleSetEmissionDate} id="emission" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6" />
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-md font-semibold leading-6 text-gray-200">Cancelar</button>
          <button 
            type="button"
            onClick={() => {
              setDataList((currentList) => [...currentList, fields])
              setModalVisible(true)
            }}
            className="rounded-md bg-indigo-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </Fragment>
  )
}