import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";




@Injectable({providedIn: 'root'})
export class GifsService{

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'su7drdvPWYYLzqlBjh078JOELxvD8vKZ';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';


  constructor(private http:HttpClient){
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }


  get tagsHistory(){
    return [...this._tagsHistory];
  }


  private organizeHistory(tag: string){
    tag = tag.toLocaleLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag)=>oldTag!==tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,15);
    this.saveLocalStorage();

  }

  //Método para guardar la información de búsqueda en el local storage
  private saveLocalStorage(): void{
    // COn JSON.stringify serializamos el objeto, es decir es la represetnación el objeto string[] a
    // solo un string, esto nos sirve ya que setItem requiere de un string
    localStorage.setItem('history',JSON.stringify(this._tagsHistory) )
  }

  //Método para cargar la información que hay en el localStorage
  private loadLocalStorage(): void{
    //Si no tenemos data en el localStorage (es decir si no hay un historial guardado) que no haga nada;
    //!Hacemos esta condición ya que el localStorage.getItem('history') devuelve un string | null, el
    //! string es por el objeto en string del local storage, y el null porque puede que no haya historial en el local estorage
    if(!localStorage.getItem('history'))return;

    //JSON.parse es el proceso inverso de JSON.stringify, convertimos el string a objeto string[]
    this._tagsHistory =JSON.parse(localStorage.getItem('history')!); //! Con el "!"(not null operator) le decimos a typescript que siempre vendrá una data

    if(this._tagsHistory.length===0)return;
    this.searchTag(this._tagsHistory[0]);
  }



  // Método Http para buscar los Gifs
  searchTag(tag: string):void{
    if(tag.length===0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params}
    ).subscribe(resp=>{

      this.gifList = resp.data;
      // console.log({gifs: this.gifList})

    })
  }



}
