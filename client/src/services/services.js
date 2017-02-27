import axios from 'axios';

export const getCampaigns = (offset) => (
    axios.get('http://localhost:5000/api/v1/advertisers?limit=12&offset=' + offset)
);
