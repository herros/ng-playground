import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { noLoaderVisible } from '@app/shared/utils/globals';

export class BaseService {
  protected readonly http: HttpClient = inject(HttpClient);
  private readonly _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private readonly _url: string = '/api/v1/';

  protected getOptions(): { headers: HttpHeaders } {
    return this._options;
  }

  protected getUrl(extension: string): string {
    return this._url + extension;
  }

  protected skipLoader(): { context: HttpContext } {
    return { context: new HttpContext().set(noLoaderVisible, true) };
  }
}
