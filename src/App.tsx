import { useState } from "react";
import Tabela from "./Components/Tabela";
import dados from "./dados.json";
import ModalInserir from "./Components/ModalInserir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface IDados {
    codigo: number;
    descricao: string;
    preco: string;
    dt_cadastro: string;
}

function App() {
    const [data, setData] = useState(dados);
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCreateItem = (novoItem: IDados) => {
        setData([...data, novoItem]);
    };

    return (
        <div>
            <div className="m-4 p-1">
                <button
                    className="btn btn-primary d-flex justify-content-center align-items-center m-2 px-3"
                    onClick={() => setShowModal(true)}
                    style={{ position: "absolute", top: 0, right: 0 }}
                >
                    <FontAwesomeIcon icon={faPlus} /> Novo Item
                </button>
                <ModalInserir
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleCriar={handleCreateItem}
                />
            </div>
            <Tabela dados={data} setData={setData} />
        </div>
    );
}

export default App;
