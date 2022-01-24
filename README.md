# ciam-member-site-1

Okta CIAM demo website

<img src="/Capture.PNG" alt="drawing" width="600"/>
<img src="/Capture2.PNG" alt="drawing" width="600"/>
<img src="/Capture3.PNG" alt="drawing" width="600"/>
<img src="/Capture4.PNG" alt="drawing" width="600"/>
<img src="/Capture5.PNG" alt="drawing" width="600"/>
<img src="/Capture6.PNG" alt="drawing" width="600"/>
<img src="/Capture7.PNG" alt="drawing" width="600"/>
<img src="/Capture8.PNG" alt="drawing" width="600"/>

**Please note this is NOT an official Okta tool, and the Okta support team WILL NOT provide support for this application.**

## What does this tool do?
* This is a sample application, which uses the Okta SDK (https://github.com/okta/okta-auth-js) for authentication.
* Displays basic information about the user, and also provides capability to update user information.
* A shopping cart has been implemented, with MFA on demand to provide security.
* At check out, if the user's address is changed, the user profile on Okta will be updated with the latest address entered on checkout.
* A service runs on a periodic basis to check the validity of the access token, and if the access token is found to be invalid, the user will be forced to re-authenticate.
* Auto logout after the access token expires.  The default is 1 hour.

## Shopping items
The below file contains a list of items to be displayed in the Swag store.

```/src/app/shoppingcart/product-stock/product-stock.ts```

## Required Scopes and claims
In the OIDC application, the below scopes need to be configured in order to download the required data to display on the screen.
- okta.users.manage.self
- okta.users.read.self

## Supported Language
- Currently in Japanese only.

## Development Environment
```
     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 11.0.4
Node: 14.15.0
OS: linux x64

Angular: 11.0.4
... animations, cli, common, compiler, compiler-cli, core, forms
... language-service, platform-browser, platform-browser-dynamic
... router
Ivy Workspace: Yes

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1100.4
@angular-devkit/build-angular   0.1100.4
@angular-devkit/core            11.0.4
@angular-devkit/schematics      11.0.4
@angular/cdk                    11.2.13
@angular/flex-layout            12.0.0-beta.35
@angular/http                   7.2.16
@angular/localize               11.2.14
@angular/material               11.2.13
@schematics/angular             11.0.4
@schematics/update              0.1100.4
rxjs                            6.6.3
typescript                      4.0.3
```

## How to run this tool
- In a directory of your choice,
- Clone the repo,
- Enter the directory,
- Install pakackages : `npm install`
- Run the tool : `ng serve`
- Open the tool : `http://localhost:4200`


## Configurations
- Information on the API enpoints - `src/app/shared/otka/okta-config.ts`

- OIDC configuration - `src/app/shared/okta/okta-config.ts`

- Sample configuration file - `src/app/shared/okta/sample-okta-config.ts`

- Inside the files, the below section will need to be updated with your setting.

```
 strBaseURI = '{{Base URI}}';  
 strRedirectURL = '{{Redirect URI}}';
 strClientID = '{{Client ID}}';
 strIssuer = '{{Issuer URI}}';  /// This must be the Org URL ////
 strPostLogoutURL = '{{Redirect URI}}';
 strScope = ['openid', 'email', 'profile','address','okta.users.read.self','okta.users.manage.self','okta.factors.read','okta.users.read','okta.users.manage'];
 strResponseType = ['token','id_token'];
 strResponseMode = 'fragment';
 strPrompt = ['consent','login'];
 strPkce = false;
 strLang = '{{Language code}}';
 strBrand =  '{{Colour}}';
 strLogo = '{{Logo URL}}';

```

**WARNING
Please note, the issuer URL is the org URL and not the authorisation server URL.**




