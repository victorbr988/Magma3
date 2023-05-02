import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// pdfMake.fonts = Object.assign({}, robotoFonts, pdfMake.fonts);
// const imgData = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(logoNFC.data.buffer)))}`;


export function Invoicepdf(nfcData) {

  const reportTitle = [];

  const details = [
    {
      style: 'tableExample',
      text: 'Dados do cliente',
			table: {
				headerRows: 1,
				body: [
					[
            {text: 'Nome', style: 'tableHeader'},
            {text: 'Código postal', style: 'tableHeader'},
            {text: 'Cidade', style: 'tableHeader'}, 
            {text: 'Rua', style: 'tableHeader'},
            {text: 'Estado - UF', style: 'tableHeader'},
            {text: 'Bairro', style: 'tableHeader'},
            {text: 'Número', style: 'tableHeader'},
            {text: 'Data da compra', style: 'tableHeader'},
            {text: 'Contato', style: 'tableHeader'},
          ],
					[
            nfcData.client,
            nfcData.zip_code,
            nfcData.city,
            nfcData.state_uf,
            nfcData.district,
            nfcData.neighborhood,
            nfcData.homeNumber,
            nfcData.buy_date,
            nfcData.phone
          ],
				]
			},
			layout: 'headerLineOnly',

      text: 'Nota fiscal',
      table: {
				headerRows: 1,
				body: [
					[
            {text: 'Chave de acesso', style: 'tableHeader'}, 
            {text: 'Identificador da nota fiscal', style: 'tableHeader'}, 
            {text: 'Produto', style: 'tableHeader'},
            {text: 'Valor em R$', style: 'tableHeader'},
            {text: 'Data de emissão', style: 'tableHeader'},
          ],
					[
            nfcData.key_access, 
            nfcData.invoiceNumber,
            nfcData.product,
            nfcData.product_value,
            nfcData.emission_date
          ],
				]
			},
			layout: 'headerLineOnly'
		},
  ];

  const footer = [];

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    styles: {
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      tableExample: {
        margin: [0, 5, 0, 15]
      },
    },
    footer:[footer]
  }

  // pdfMake.createPdf(docDefinitions).download(`NFC-${nfcData.invoiceNumber}.pdf`)
  pdfMake.createPdf(docDefinitions).print()
}