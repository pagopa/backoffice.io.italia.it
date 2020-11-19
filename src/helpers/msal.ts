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

export function getUserAgentApplication() {
  return new UserAgentApplication({
    auth: {
      clientId: configuration.clientID,
      authority: configuration.authority,
      redirectUri: configuration.redirectUri,
      validateAuthority: configuration.validateAuthority,
      postLogoutRedirectUri: configuration.postLogoutRedirectUri
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true
    }
  });
}

export async function getUserTokenOrRedirect() {
  const userAgentApplication = getUserAgentApplication();

  userAgentApplication.handleRedirectCallback((authError, authResponse) => {
    console.debug("getUserTokenOrRedirect::params", authError, authResponse);
  });

  const account = userAgentApplication.getAccount();
  console.debug("getUserTokenOrRedirect::account");

  if (userAgentApplication.isCallback(window.location.hash)) {
    return;
  }

  if (!account) {
    console.debug("getUserTokenOrRedirect::loginRedirect");
    return userAgentApplication.loginRedirect(configuration.b2cScopes);
  }

  try {
    const authResponse = await userAgentApplication.acquireTokenSilent({
      scopes: [...configuration.b2cScopes]
    });
    console.debug("getUserTokenOrRedirect::authResponse");

    return {
      token: authResponse.accessToken,
      account: userAgentApplication.getAccount()
    };
  } catch (e) {
    console.debug("getUserTokenOrRedirect::error", e);
    return userAgentApplication.acquireTokenRedirect({
      scopes: [...configuration.b2cScopes]
    });
  }
}
