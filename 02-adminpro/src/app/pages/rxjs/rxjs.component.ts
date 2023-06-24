import { Component } from '@angular/core';
import { Observable, retry, interval, take, map, filter } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    // this.sendObservable().pipe(
    //   retry(1)
    // ).subscribe({
    //   next: valor => {
    //     console.log('Subscripcion ' + valor)
    //   },
    //   error: error => {
    //     console.warn('Error', error);
    //   },
    //   complete: () => console.log('ObsTerminado')
    // });

    this.sendInterval().subscribe({
      next: (value) => {
        console.log(value);
      }
    })

  }

  public sendInterval(): Observable<number> {
    return interval(500).pipe(
      map(valor => valor + 1),
      filter( valor => valor % 2 === 0),
      take(10),
      )
  }

  public sendObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error("Error al llegar al valor de 2");
        }

      }, 1000);

    });

    return obs$;
  }


}
