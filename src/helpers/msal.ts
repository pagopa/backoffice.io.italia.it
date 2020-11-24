/**
 * MSAL (Microsoft authentication library) routines to log in the user
 * using the account registered on the Active Dirctory B2C instance.
 *
 * Configuration comes from the remote endpoint.
 * Needs a promise polyfill for old browsers.
 */
import { UserAgentApplication } from "msal";

interface IMsalConfig {
  audience: string;
  authority: string;
  b2cScopes: readonly string[];
  changePasswordLink?: string;
  clientID: string;
  redirectUri?: string;
  validateAuthority?: boolean;
  postLogoutRedirectUri?: string;
}

const configuration: IMsalConfig = {
  audience:
    "https://iobackoffice.b2clogin.com/iobackoffice.onmicrosoft.com/c2c9dbf8-9fc3-4f69-b8a6-c87d10d0ab06",
  authority:
    "https://iobackoffice.b2clogin.com/iobackoffice.onmicrosoft.com/B2C_1_backoffice",
  b2cScopes: [
    "https://iobackoffice.onmicrosoft.com/c2c9dbf8-9fc3-4f69-b8a6-c87d10d0ab06/ProfileRead"
  ],
  changePasswordLink: "",
  clientID: "c2c9dbf8-9fc3-4f69-b8a6-c87d10d0ab06",
  redirectUri: window.location.origin,
  validateAuthority: false,

  postLogoutRedirectUri: window.location.origin + "/#/logout"
};

export const getUserAgentApplication = () => {
  return new UserAgentApplication({
    auth: {
      authority: configuration.authority,
      clientId: configuration.clientID,
      postLogoutRedirectUri: configuration.postLogoutRedirectUri,
      redirectUri: configuration.redirectUri,
      validateAuthority: configuration.validateAuthority
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });
};

export const getUserTokenOrRedirect = async () => {
  const userAgentApplication = getUserAgentApplication();

  userAgentApplication.handleRedirectCallback((authError, authResponse) => {
    // tslint:disable-next-line: no-console
    console.debug("getUserTokenOrRedirect::params", authError, authResponse);
  });

  const account = userAgentApplication.getAccount();
  // tslint:disable-next-line: no-console
  console.debug("getUserTokenOrRedirect::account");

  if (userAgentApplication.isCallback(window.location.hash)) {
    return;
  }

  if (!account) {
    // tslint:disable-next-line: no-console
    console.debug("getUserTokenOrRedirect::loginRedirect");
    return userAgentApplication.loginRedirect({
      scopes: [...configuration.b2cScopes]
    });
  }

  try {
    const authResponse = await userAgentApplication.acquireTokenSilent({
      scopes: [...configuration.b2cScopes]
    });
    // tslint:disable-next-line: no-console
    console.debug("getUserTokenOrRedirect::authResponse");

    return {
      account: userAgentApplication.getAccount(),
      token: authResponse.accessToken
    };
  } catch (e) {
    // tslint:disable-next-line: no-console
    console.debug("getUserTokenOrRedirect::error", e);
    return userAgentApplication.acquireTokenRedirect({
      scopes: [...configuration.b2cScopes]
    });
  }
};
