import { inject, Service, Signal } from '@angular/core';
import { GlobalStore } from '@app/globalstore/global.store';

@Service()
export class GlobalStoreFacade {
  private readonly store = inject(GlobalStore);

  public get title(): Signal<string> {
    return this.store.title;
  }

  public set title(value: string) {
    this.store.setTitle(value);
  }
}
