//os atributos de paginacao que vao ser o _page e o _limit da url
// http://localhost:3001/products?_page=2&_limit=5
export interface PageQuery {
  pageNumber: number,
  pageSize: number
}

export interface QueryBuilder {  // reponsavel por fazer o map para string
  pageQuery: PageQuery;
  additionalQuery: Map<string, string>;
  buildQueryMap(): Map<string, string>;//contruir o mapa de atributos de parametros
  builQueryString(): string;//trasnforma o mapa de parametro em string
  buildPageQueryMap(): Map<string, string>;// mapiando a inerface com map
}

export class PageRequest implements QueryBuilder {
  //passando os atributos no contrutor é uma forma de ja declarar ele e atribuir as variaveis da class
  constructor(public pageQuery: PageQuery, public additionalQuery: Map<string, string>){

  }

  buildQueryMap(): Map<string, string> {
    // concatena com a buildPageQueryMap
    let buildQueryMap = new Map<string, string>( [...this.buildPageQueryMap()]);

    // se tiver adicional concatena os 2
    if(this.additionalQuery){
      buildQueryMap = new Map<string, string>([...buildQueryMap, ...this.additionalQuery])
    }
    return buildQueryMap;
  }

  builQueryString(): string {
    // ele vai trnsformar o mapa na string _page=2&_limit=5, de forma que possa ser usado essa string na url.
    return Array.from(this.buildQueryMap()).map( // Array.from estrai array de um map
      itemArray=> `${itemArray[0]}=${itemArray[1]}}` //cada item do array p/ string
    ).join("&"); // trnsaforma string em array
  }


  buildPageQueryMap(): Map<string, string> {
    let buildPageQueryMap = new Map<string, string>();

    buildPageQueryMap.set("_page", `${this.pageQuery.pageNumber + 1}`);
    buildPageQueryMap.set("_limit", `${this.pageQuery.pageSize}`);

    return buildPageQueryMap;
  }

}

export class Page<T>{
  constructor( public content: T[], public totalElement: number ){}

  static fromResponse<T>(response: any){
    //X-Total-Count pega o valor total de itens no getAll, vem no header da requisição
    return new Page<T>(response.body, parseInt(response.headers.get("X-Total-Count")));
  }
}
