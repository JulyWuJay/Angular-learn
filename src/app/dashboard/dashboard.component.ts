import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/service/hero.service';
import { Hero } from 'src/types/hero';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private heroService: HeroService) { }
  heroes: Hero[] = []
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
  ngOnInit(): void {
    this.getHeroes()
  }

}
