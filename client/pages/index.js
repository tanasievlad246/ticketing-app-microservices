import buildClient from "../api/build-client";

export const LandingPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Home</h1>
}

export const getServerSideProps = async (context) => {
    try {
        const { data } = await buildClient(context).get('/api/users/currentuser');
        return { props: data };
    } catch (error) {
        console.log(error);
        return { props: {} };
    }
}

export default LandingPage;
