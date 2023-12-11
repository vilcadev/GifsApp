import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

  @Input()
  public gif!:Gif;
  // public gif!:Gif; // Podemos agregarle el "!" y con eso le decimos a angular que confie en que siempre                siempre recibirá un valor


    //El ngOnInit es un método especial de los componentes de angular, el cual se va a ejecutar
  //cuando el componente se ha inicializado.
  ngOnInit(): void {
    if(!this.gif)throw new Error('Gif property is missing');
  }


}
