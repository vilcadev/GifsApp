import { Component, ElementRef, ViewChild } from "@angular/core";
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template:`
    <h5>Buscar:</h5>
    <input type="text"
    class="form-control placeholder-white"

    style="         padding: 6px 12px;
                    background: rgb(31, 32, 35);
                    border: 1px solid rgb(60, 63, 68);
                    border-radius: 4px;
                    font-size: 13px;
                    color: whitesmoke!important;
                    height: 46px;
                    appearance: none;
                    transition: border 0.15s ease 0s;
                    :focus{
                        outline: none;
                        box-shadow: none;
                        border-color: rgb(100, 153, 255);
                    }
                     .placeholder-white::placeholder {
      color: white;
    }
                "
    placeholder="Ingresa tu búsqueda ..."
    (keyup.enter)="searchTag()"

    #txtTagInput
    >
  `,
   styles: [`
   .placeholder-white::placeholder {
     color: white;
   }
 `]
})


export class SearchBoxComponent{

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService:GifsService){ }


  searchTag(){
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }
}
