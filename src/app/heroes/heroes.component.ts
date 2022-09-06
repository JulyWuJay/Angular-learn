import { Component, OnInit } from '@angular/core';
import { Hero } from '../../types/hero'
import { HeroService } from 'src/service/hero.service';
import { MessageService } from 'src/service/message.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {
    id: 1,
    name: 'windstorm'
  }
  heroes: Hero[] = []
  newName = ''
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes)
  }
  addHero() : void {
    console.log(this.newName)
    this.heroService.addHero(this.newName)
      .subscribe(hero => {
        this.getHeroes()
      })
  }
  deleteById(id: number) : void {
    this.heroService.deleteHeroById(id)
      .subscribe(_ => {
        this.getHeroes()
      })
  }
  ngOnInit(): void {
    this.getHeroes()
  }

}
