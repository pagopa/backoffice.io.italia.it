/**
 * MSAL (Microsoft authentication library) routines to log in the user
 * using the account registered on the Active Dirctory B2C instance.
 *
 * Configuration comes from the remote endpoint.
 * Needs a promise polyfill for old browsers.
 */
import { UserAgentApplication } from "msal";

const b2cscopes = process.env.ADB2C_TENANT_B2CSCOPES?.split(",") || [];

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
  audience: process.env.ADB2C_TENANT_AUDIENCE || "",
  authority: process.env.ADB2C_TENANT_AUTHORITY || "",
  b2cScopes: b2cscopes,
  changePasswordLink: "",
  clientID: process.env.ADB2C_TENANT_CLIENTID || "",
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
      storeAuthStateInCookie: false
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
