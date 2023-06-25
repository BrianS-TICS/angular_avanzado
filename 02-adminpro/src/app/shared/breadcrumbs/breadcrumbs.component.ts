import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public title = '';
  public titlesSubs$: Subscription;

  constructor(private router: Router) {
    this.titlesSubs$ = this.getRouteArguments().subscribe(({ title }) => {
      this.title = title;
    });
  }

  ngOnDestroy(): void {
      this.titlesSubs$.unsubscribe();
  }

  private getRouteArguments(): Observable<any> {

    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data),
      );

  }

}
