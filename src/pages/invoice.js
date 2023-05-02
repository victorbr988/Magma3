import { Fragment } from "react"
import logoNFC from "../../public/logo-nfc.png"
import Image from "next/image"
import { useRouter } from "next/router"

export default function Invoice() {
  const router = useRouter()
  const { key_access } = router.query

  function formatDateTime(dateTimeStr) {
    const dateObj = new Date(dateTimeStr);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  const currentFormField = JSON.parse(localStorage.getItem("formFields")) || []
  const invoice = currentFormField.find((data) => data.key_access === key_access)

  return (
    <Fragment>
      <div className="container min-h-screen ">
        <div class="header">
          <Image src={logoNFC} width={180} alt="Logo" />
          <div>
            <p>TechnoChem</p>
            <p>CNPJ: 50.138.763/0001-71</p>
            <p>Endereço: AV MONTE CASSINO, Nº 695</p>
            <p>Telefone: (81) 99154-4050</p>
          </div>
        </div>
        
        <div class="details">
          <div class="left">
            <p><strong>Cliente:</strong>{invoice.client}</p>
            <p><strong>Endereço:</strong>{invoice.district}</p>
            <p><strong>Telefone:</strong>{invoice.phone}</p>
          </div>
          <div class="right">
            <p><strong>Data da compra:</strong> {formatDateTime(invoice.buy_date)}</p>
            <p><strong>Número da nota:</strong> {invoice.invoiceNumber}</p>
          </div>
        </div>
        <div class="items">
          <div class="item">
            <span><strong>Descrição do Produto</strong></span>
            <span class="price"><strong>Preço
            </strong></span>
          </div>
          <div class="item">
            <span>{invoice.product}</span>
            <span class="price">{Number(invoice.product_value).toLocaleString('ja-JP', { style: 'currency', currency: 'BRL' })}</span>
          </div>
        </div>
        <div class="total">
          <span>Total:</span>
          <span>{Number(invoice.product_value).toLocaleString('ja-JP', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div class="absolute bottom-4 text-gray-500">
          <p>Esta nota fiscal foi gerada automaticamente pelo sistema.</p>
          <p>Para mais informações, entre em contato conosco pelo telefone (81) 9154-4050 ou pelo e-mail Contato@technochem.com.br</p>
        </div>
	    </div>
    </Fragment>
  )
}