import axios from 'axios';

const fetchData = () => {
    return axios.get("/api/getProjects")
        .then((response) => console.log(response.data));}

export default fetchData;
