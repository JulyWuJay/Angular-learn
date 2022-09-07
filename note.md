## 1 创建项目
```
ng new xxx
```
## 2 运行项目
```
ng serve --open
```
## 3 使用
```
ng g c xxx
```
### 3.1 xxx.component.ts里面
```
import { Component, OnInit } from '@angular/core';
  @Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.scss']
  })
  export class HeroesComponent implements OnInit {
    constructor() { }
    ngOnInit(): void {
    }
  }
```
1. selector: 组件里css元素选择器
2. templateUrl: 组件模板文件的位置
3. styleUrls: 组件私有css样式文件的位置
### 3.2 
```
<h2>{{hero.name | uppercase}} Details</h2>
```
uppercase用来调用内置管道 Uppercase Pipe

### 3.3 使用ngModel
1. 在app.module.ts 中导入
```
import { FormsModule } from '@angular/forms';
```
2. imports数组里添加 FormsModule
3. 页面中使用
```
 <input id="name" [(ngModel)]="hero.name"  placeholder="name">
```
### 3.4 ngFor
```
*ngFor="let item of list"
```
### 3.5 class
```
[class.selected]="hero === selectedHero"
```
### 3.6 添加click事件

```
(click)="onSelect(hero)"
```
```
  onSelect(hero: Hero): void {
    this.selectedHero = hero
    console.log(this.selectedHero, 'this.selectedHero')
  }
```
### 3.7 ngIf
```
*ngIf="selectedHero"
```
### 3.8 单项数据绑定
父组件里：
```
<app-hero-detail [hero]="selectedHero" ></app-hero-detail>
```
子组件里面： 
```
@Input() hero?: Hero
```
### 3.9 service
1. 创建service
```
ng g s xxx
```
2. 添加一个方法，例如返回一个列表
```
getHeroes(): Hero[] {
  return HEROES;
}
```
3. 注入服务 在页面中
```
constructor(private heroService: HeroService) { }
```
4. 创建方法，调用方法
```
getHeroes(): void{
  this.heroes = this.heroService.getHeroes()
}
ngOnInit(): void {
  this.getHeroes()
}
```
5. 当service里的数据需要绑定页面显示时，需要用public
### 3.10 router
