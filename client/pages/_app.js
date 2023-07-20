import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client';
import App from 'next/app';
import Header from '../components/header';

export const MyApp = ({ Component, pageProps }) => {
    return <div>
        <Header currentUser={pageProps.currentUser} />
        <Component {...pageProps} />
    </div>
}

MyApp.getInitialProps = async (appContext) => {
    const { ctx } = appContext;
    // Getting the props of the MyApp component
    const appProps = await App.getInitialProps(appContext);

    try {
        const client = buildClient(ctx);
        const { data } = await client.get('/api/users/currentuser');
        appProps.pageProps.currentUser = data.currentUser;
    } catch (error) {
    }

    return appProps;
}

export default MyApp;
