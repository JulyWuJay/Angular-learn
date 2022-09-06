import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HEROES } from 'src/mock/heroes';
import { Hero } from 'src/types/hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  baseUrl = '/api'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  getHero(id: number) : Observable<Hero> {
    const url = `${this.baseUrl}/getHeroById/${id}`
    return this.http.get<Hero>(url)
            .pipe(
              tap(_ => this.log(`fetch hero id = ${ id }`)),
              catchError(this.handleError<Hero>('getHeroById'))
            )
  }
  searchHeroes(name: string) : Observable<Hero[]> {
    const url = `${this.baseUrl}/getHeroByName/${name}`
    return this.http.get<Hero[]>(url)
            .pipe(
              tap(_ => this.log(`fetch hero name = ${ name }`)),
              catchError(this.handleError<Hero[]>('getHeroByName'))
            )
  }
  deleteHeroById(id: number): Observable<string> {
    const url = `${this.baseUrl}/deleteHeroById/${id}`
    return this.http.get<string>(url)
            .pipe(
              tap(_ => this.log(`delete hero id = ${ id }`)),
              catchError(this.handleError<string>('deleteHeroById'))
            )
  }
  getHeroes() : Observable<Hero[]> {
    const getHeroesUrl = 'getHeroes'
    return this.http.get<Hero[]>(`${this.baseUrl}/${getHeroesUrl}`)
            .pipe(
              tap(_ => this.log('fetch heroes')),
              catchError(this.handleError<Hero[]>('getHeroes', []))
            )
  }
  updateHero(hero: Hero) : Observable<Hero> {
    const url = `${this.baseUrl}/updateHero`
    return this.http.post<Hero>(url, hero, this.httpOptions)
            .pipe(
              tap(_ => this.log(`update hero id = ${ hero.id }`)),
              catchError(this.handleError<Hero>('update hero'))
            )
  }
  addHero(name: string) : Observable<Hero> {
    const url = `${this.baseUrl}/addHero`
    return this.http.post<Hero>(url, { name }, this.httpOptions)
              .pipe(
                tap(_ => this.log(`add hero name = ${name}`)),
                catchError(this.handleError<Hero>('add hero'))
              )
  }
}
