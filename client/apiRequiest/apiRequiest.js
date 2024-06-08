import axios from "axios";

let BaseURL = "http://localhost:5000";

// add candidate
export  async function carListApiRequest() {
    try {
        let result = await axios.get('https://exam-server-7c41747804bf.herokuapp.com/carsList');
        let data = result['data']['data']
        return data;
    }
    catch (e) {
        return false
    }
 }



