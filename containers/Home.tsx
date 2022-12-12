import { NextPage } from "next";

type HomeProps = {
    setToken(s:string):void
}

export const Home: NextPage<HomeProps> = ({setToken}) => {

    const sair = () => {
        localStorage.clear();
        setToken('');
    }

    return (
        <>
            <h1>Home</h1>
            <img src="/exit-desktop.svg" alt="Sair" onClick={sair}/>
        </>
    );
}