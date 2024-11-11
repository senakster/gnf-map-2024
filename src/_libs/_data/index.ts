import Axios, { AxiosResponse } from 'axios'
import GNFGrupper from './GNF-Grupper-new.json'
import config from '@/_libs/_config/config.json'

export async function getGnfGrupper(): Promise<[] | AxiosResponse<TServerResponse, unknown>> {
    try{
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                // ...authHeader()
            }
        }
        /** FORCE RELOAD */
        const response = await Axios.get(`${config.app.dburl}?v=${new Date().getTime()}`, requestOptions)
        console.log('Data Collected')
        // const response = await Axios.get(`${app.dataurl}?v=${new Date().getDate()}`, requestOptions)
        
        return response
    } catch {
        return []
    }
};

export async function getGnfGrupperREST(): Promise<TGNFG[]> {
    try {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                // ...authHeader()
            },
            next: { revalidate: 3600 }
        }
        // const response = await Axios.get(`${app.RESTurl}/groups`, requestOptions)
        console.log('Data Collected')
        // const response = await Axios.get(`${app.dataurl}?v=${new Date().getDate()}`, requestOptions)
        const response = await fetch(`${config.app.RESTurl}/groups`, requestOptions)
        return response.json()
    } catch {
        return []
    }
};

export const data = {
    grupper: GNFGrupper.grupper,
    getGrupper: getGnfGrupper
}

export default data;