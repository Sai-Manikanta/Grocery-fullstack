import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from '../../../api/axios';

const options = {
    providers: [
        Providers.Credentials({
            name: 'Custom Provider',
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                const { email, password } = credentials;

                try {
                    // Make an API call to your backend authentication server
                    const response = await axios.post('/api/v1/auth/login', {
                        email,
                        password,
                    });

                    // If the response contains user data, return the user object
                    if (response.data && response.data.user) {
                        return Promise.resolve(response.data);
                    }

                    // If the authentication failed, return null
                    return Promise.resolve(null);
                } catch (error) {
                    // Handle any errors that occur during the API call
                    console.error('Authentication API call failed:', error);
                    return Promise.resolve(null);
                }

                // username, password
                // const response = await axios.post('/v1/auth/login', { email, password });

                // if (response) {
                //     return Promise.resolve(response.data);
                // }

                // return Promise.resolve(null);
            },
        }),
    ],
    // Add other NextAuth.js options as needed
};

export default NextAuth(options);
