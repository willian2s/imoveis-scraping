const puppeteer = require('puppeteer');

const url = 'https://seuimovelbb.com.br/busca?from=0&noDebts=false&noLegalActions=false&orderBy=data&page=0&searchId=&visits=false';

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Acessa a pagina do Seu Imóvel BB
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Captura os dados dos imóveis
  const imoveis = await page.evaluate(() => {
    
    const codImoveis = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > div.PropertyCard_tags__x6cOC > span:nth-child(1)'),
    ];
    codImovel = codImoveis.map((codImovel) => {
      return codImovel.innerText;
    })

    const situacoesImoveis = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > div.PropertyCard_tags__x6cOC > span:nth-child(2)'),
    ];
    situacaoImovel = situacoesImoveis.map((situacaoImovel) => {
      return situacaoImovel.innerText;
    })

    const TipoVendas = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > div.PropertyCard_tags__x6cOC > span:nth-child(3)'),
    ];
    tipoVenda = TipoVendas.map((tipoVenda) => {
      return tipoVenda.innerText
    })

    const locacoes = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > header > a > div > p')
    ];
    locacao = locacoes.map((locacao) => {
      return locacao.innerText
    })

    const enderecos = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > address > div > p')
    ]
    endereco = enderecos.map((endereco) => {
      return endereco.innerText
    })

    const dormitorios = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > div.PropertyCard_features__2Y99T > div:nth-child(1) > div.Feature_row-text__2blsy > p:nth-child(1)')
    ]
    dormitorio = dormitorios.map((dormitorio) => {
      return dormitorio.innerText
    })

    const vagasGaragem = [
      ...document.querySelectorAll('div.PropertyCard_information__2jyku > div.PropertyCard_features__2Y99T > div:nth-child(2) > div.Feature_row-text__2blsy > p:nth-child(1)')
    ]
    vagaGaragem = vagasGaragem.map((vagaGaragem) => {
      return vagaGaragem.innerText
    })

    const ValoresAvaliacao = [
      ...document.querySelectorAll('div.PropertyCard_values__1BhDP > span > div > p.Text_text__1O0TZ.Text_darkBlueColor__3oIqe.Text_font-medium__xE0vG.AprraisedValue_value__IeRk4.AprraisedValue_strike__3JmoR')
    ]
    valorAvaliado = ValoresAvaliacao.map((valorAvaliado) => {
      return valorAvaliado.innerText
    })

    const desagios = [
      ...document.querySelectorAll('div.PropertyCard_values__1BhDP > span > span > span.SaleValueText_saleValueText__Pt6dc > strong')
    ]
    desagio = desagios.map((desagio) => {
      return desagio.innerText
    })

    return {
      codImovel,
      situacaoImovel,
      tipoVenda,
      locacao,
      endereco,
      dormitorio,
      vagaGaragem,
      valorAvaliado,
      desagio
    }
  });

  // const nextPage = await page.$(
  //   'div.Pagination_container__GPTNG > ul > li.next'
  // )

  console.log(imoveis)

  await browser.close();
};

main();
