import { AuthConfig } from "angular-oauth2-oidc";

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8181/realms/coursera-realm',
    // issuer: 'https://spring-coursera.fly.dev/realms/coursera-realm',
    tokenEndpoint: 'http://localhost:8181/realms/coursera-realm/protocol/openid-connect/token',
    // tokenEndpoint: 'https://spring-coursera.fly.dev/realms/coursera-realm/protocol/openid-connect/token',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    clientId: 'angular-client',
    responseType: 'code',
    strictDiscoveryDocumentValidation: true,
    scope: 'openid profile email offline_access',
    customQueryParams: {
        prompt: 'select_account'
    }
}