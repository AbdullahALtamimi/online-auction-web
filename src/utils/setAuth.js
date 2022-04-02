import axios from "axios";
const setAuthheader=(token)=>{
    if(token){
        axios.defaults.headers = {
            Authorization:'bearer '+ token,
        };
    }else{
        delete axios.defaults.headers.Authorization;
    }
};

export default setAuthheader;