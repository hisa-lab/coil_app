import { ApplicationRef, NgModuleRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { createNewHosts } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

function bootstrap(boot: () => Promise<NgModuleRef<any>>) {
  if (module['hot']) {
    return bootstrapWithHmr(boot);
  }

  return boot();
}

function bootstrapWithHmr(boot: () => Promise<NgModuleRef<any>>) {
  let ngModule: NgModuleRef<any>;

  module['hot'].accept();

  const booting = boot().then((mod) => {
    ngModule = mod;

    return mod;
  });

  module['hot'].dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });

  return booting;
}

function main() {
  bootstrap(() => platformBrowserDynamic().bootstrapModule(AppModule))
    .catch(console.error);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
