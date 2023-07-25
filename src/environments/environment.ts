// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  appName: "Good Act",
  logoUrl: "https://fir-erp-944d6.web.app/assets/images/logo.jpeg",
  production: false,
  joiningCharges: 2200,
  baseurl: "http://localhost:4200/api",
  
  firebase: {
    apiKey: "AIzaSyAjDTRI2NaX-H6D6gdWECulh4NZbLuNx7s",
    authDomain: "all-pay-2023.firebaseapp.com",
    projectId: "all-pay-2023",
    storageBucket: "all-pay-2023.appspot.com",
    messagingSenderId: "57948518532",
    appId: "1:57948518532:web:acf9027c8214bc8af76ad1"
  },
  razorpay: {
    keyId: "rzp_test_OhtTwkr00dbNU1"
  },
  recaptcha_site_key: "6LdbScYcAAAAAMy3OZigFtko17jK8DiQvEy7YzV4"
};

export var EXTRAS = {
  storeSettings: {
    logo: {
      downloadUrl: "",
      uploadPath: ""
    }
  }
}

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
