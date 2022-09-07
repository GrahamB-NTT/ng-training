export default {
    oidc: {
        clientId: '0oa6d44lwwDsEdFHH5d7',
        issuer: 'https://dev-39960447.okta.com/oauth2/default',
        redirectUri: window.location.origin + '/login/callback',
        pkce: true,
        token_endpoint_auth_method: 'none',
        scopes: [
            'openid',
            'profile',
            'email'
        ],
        grant_types: [
            'refresh_token',
            'authorization code'
        ]
    }
}