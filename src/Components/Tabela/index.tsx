import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfo, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditarModal from "../EditarModal";
import InfoModal from "../InfoModal";

interface IDados {
    codigo: number;
    descricao: string;
    preco: string;
    dt_cadastro: string;
}

interface ITabelaProps {
    dados: IDados[];
    setData: React.Dispatch<React.SetStateAction<IDados[]>>;
}

function Tabela(props: ITabelaProps) {
    const { dados, setData } = props;

    const [showInfoModal, setShowInfoModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<IDados>();
    const [showEditModal, setShowEditModal] = useState(false);

    const handleShowEditModal = (item: IDados) => {
        setSelectedItem(item);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditItem = (editedItem: IDados) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.codigo === editedItem.codigo ? editedItem : item
            )
        );
        setSelectedItem(editedItem);
    };

    const handleDeleteItem = (itemToDelete: IDados) => {
        setData((prevData) =>
            prevData.filter((item) => item.codigo !== itemToDelete.codigo)
        );

        setSelectedItem((prevSelectedItem) =>
            prevSelectedItem?.codigo === itemToDelete.codigo
                ? undefined
                : prevSelectedItem
        );
    };

    const handleShowInfoModal = (item: IDados) => {
        setSelectedItem(item);
        setShowInfoModal(true);
    };

    const handleFecharInfoModal = () => {
        setShowInfoModal(false);
    };

    useEffect(() => {
        if (!showEditModal) {
            setSelectedItem(undefined);
        }
    }, [showEditModal]);

    return (
        <div className="d-flex align-items-center justify-content-center mt-3">
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                        <th scope="col">Detalhes</th>
                    </tr>
                </thead>
                <tbody className="">
                    {dados.map((item) => (
                        <tr key={item.codigo}>
                            <td>{item.codigo}</td>
                            <td>{item.descricao}</td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleShowEditModal(item)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteItem(item)}
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-success pr-4"
                                    onClick={() => handleShowInfoModal(item)}
                                >
                                    <FontAwesomeIcon icon={faInfo} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <InfoModal
                show={showInfoModal}
                handleClose={handleFecharInfoModal}
                item={{
                    codigo: selectedItem?.codigo ?? 0,
                    descricao: selectedItem?.descricao ?? "",
                    dt_cadastro: selectedItem?.dt_cadastro ?? "",
                    preco: selectedItem?.preco ?? "",
                }}
            />

            {selectedItem && (
                <EditarModal
                    show={showEditModal}
                    handleFechar={handleCloseEditModal}
                    item={selectedItem}
                    handleEditar={handleEditItem}
                    setData={setData}
                />
            )}
        </div>
    );
}

export default Tabela;
