import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {registerLicense} from '@syncfusion/ej2-base';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment.development';

registerLicense("ORg4AjUWIQA/Gnt2VVhhQlFac11JW3xNYVF2R2FJe1RzdF9DZkwgOX1dQl9hSXtTcEVhWndceXFdQmY=");
if (environment) {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));



