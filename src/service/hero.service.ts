import { Injectable } from '@angular/core';
import { HEROES } from 'src/mock/heroes';
import { Hero } from 'src/types/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  getHero(id: number) : Observable<Hero> {
    const hero = of(HEROES.find(h => h.id === id)!)
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return hero
  }
  getHeroes() : Observable<Hero[]> {
    const hero = of(HEROES)
    this.messageService.add(`HeroService: fetched hero list`);
    return hero
  }
}
