import axios from 'axios';
import { useState } from 'react';
/**
 * @typedef {Object} UseRequest
 * @property {function} doRequest A function to execute the request
 * @property {Array<string>} errors An array of errors
 */
/**
 * @param {string} url The request url
 * @param {string} method The request method GET, POST, PUT, DELETE
 * @param {Object} body The request body
 * @param {function} onSuccess A callback function to be executed on success
 * @returns {UseRequest} An object with a doRequest function and an errors object
 */
export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            setErrors(null);
            const response = await axios[method](url, body);
            if (onSuccess) {
                onSuccess();
            }
            return response.data;
        } catch (error) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Ooooops....</h4>
                    <ul className="my-0">
                        {error.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>
            );
        }
    }

    return { doRequest, errors };
}