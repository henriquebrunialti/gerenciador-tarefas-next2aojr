import type { NextApiRequest, NextApiResponse } from "next";
import { DefaultMsgResponse } from "../../types/DefaultMsgResponse";

export default (req: NextApiRequest, res: NextApiResponse<DefaultMsgResponse>) => {
    try{
        if(req.method !== 'POST'){
            return res.status(405).json({error: 'O Método HTTP informado não existe'});
        }

        const {login, password} = req.body;

        if(!login || !password || login !== 'teste@teste.com' || password !== 'Teste@123'){
            return res.status(400).json({error: 'Usuario e senha não encontrados'});
        }

        res.status(200).json({message: 'Usuario encontrado'});
    }catch(e : any){
        console.log('Ocorreu erro ao efetuar login:', e);
        return res.status(500).json({error: 'Ocorreu erro ao efetuar login, tente novamente'});
    }
}