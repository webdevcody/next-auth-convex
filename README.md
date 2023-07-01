https://github.com/webdevcody/next-auth-convex/assets/123222405/ecdf5c51-d62d-4c5e-9b8c-0fa7f5a3d1e6

# Next with Convex and Next-Auth

This is a template project using next 13 app router, next-auth with google authentication, and convex for storing data. This manages to hook in auth by having a

## How it Works?

When a user clicks sign in, that will redirect them to google to login. After logging in, they will be redirect to the api/auth/[...nextauth].ts handler which will generate a JWT token and attach the id_token and refresh_token to the JWT. We store these on the token so that when the client initializes and needs to pass the id_token to the convex provider, we can hit the api/openid/token endpoit to get the id_token (which will read from the http only cookie), and send it back to the client so it can be passed to the provier. Additionally, when the useAuthFromNextAuth is being asked from convex to refresh, it'll make a request to /api/openid/refresh to get a new id_token which it will send to the convex provider.

After successfully passing the id_token, you'll have access to the subject (userId) inside the convex queries / mutations by calling await auth.getUserIdentity().

## Limitation

This work is coded to ONLY work with google login. This is because the api/openid/refresh method is hard coded to hit the google oauth2 endpoint. In the future, you'd probably need to store the provider inside the token so we can switch between refresh endpoints of the various identity providers.

This work does not handle magic link or email / password authentication.
