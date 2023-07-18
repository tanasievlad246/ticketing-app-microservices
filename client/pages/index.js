import axios from "axios";

export const LandingPage = ({ currentUser }) => {
    return <h1>Home</h1>
}

// This function will be executed on the server
LandingPage.getInitialProps = async (context) => {
    try {
        const response = await axios.get('http://ingess-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser');
        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
}

export default LandingPage;
