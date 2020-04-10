// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let demo = true;
let appUrl = '';

if(demo) {
  appUrl = 'http://localhost:8000/api';
}else{
  appUrl = 'https://mb82.net/api';
}

export const environment = {
  production: false,
  apiUrl: appUrl,
  version: '1.0.2'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
