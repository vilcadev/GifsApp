import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

// private
constructor( private gifsService:GifsService){}

  ngOnInit(): void {
    this.inicializarElementos();

  }



    get tags(): string[]{
      return this.gifsService.tagsHistory
    }

    searchTag(tag: string): void{

      this.gifsService.searchTag(tag);

      // this.tagInput.nativeElement.value = '';

    }

    inicializarElementos(): void {
      const sidebarCollapseButton = document.getElementById('sidebarCollapse');
      const sidebar = document.getElementById('sidebar');

      if (sidebarCollapseButton && sidebar) {
        sidebarCollapseButton.addEventListener('click', () => {
          sidebar.classList.toggle('active');
        });
      }
    }



}
