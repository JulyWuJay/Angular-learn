import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Hero } from '../../types/hero'
import { HeroService } from 'src/service/hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit { 
  @Input() hero?: Hero
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
  toSave(): void {
    console.log(this.hero)
    const hero: Hero = {
      id: Number(this.route.snapshot.paramMap.get('id')),
      name: this.hero?.name || ''
    }
    this.heroService.updateHero(hero)
      .subscribe(hero => {
        console.log(hero)
      })
  }
  ngOnInit(): void {
    this.getHero()
  }

}
