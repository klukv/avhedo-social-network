import { Component } from '@angular/core';

@Component({
  selector: 'app-form-block',
  templateUrl: './form-block.component.html',
  styleUrls: ['./form-block.component.css']
})
export class FormBlockComponent {
  constructor(){}

  clickLikeButton(){
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transition = '.3s';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transform = 'translateX(-400px) rotate(-30deg)';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.opacity = '0';
    setTimeout(() => {
      (<HTMLStyleElement>document.getElementById('card_swipe')).style.transform = 'translateX(0px) rotate(0deg)';
      (<HTMLStyleElement>document.getElementById('card_swipe')).style.opacity = '1';
    }, 1000)
  }

  clickDislikeButton(){
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transition = '.3s';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transform = 'translateX(400px) rotate(30deg)';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.opacity = '0';
    setTimeout(() => {
      (<HTMLStyleElement>document.getElementById('card_swipe')).style.transform = 'translateX(0px) rotate(0deg)';
      (<HTMLStyleElement>document.getElementById('card_swipe')).style.opacity = '1';
    }, 1000)
  }

}
