import axios from 'axios';

const fetchData = () => {
    return axios.get("/api/getProjects")
        .then((response) => {
            return response.data;
        });
}
export default fetchData;
