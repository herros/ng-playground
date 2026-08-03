import { HttpContextToken } from '@angular/common/http';

export const noLoaderVisible = new HttpContextToken<boolean>(() => true);
