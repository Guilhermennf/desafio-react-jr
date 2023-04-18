import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface IDados {
    codigo: number;
    descricao: string;
    preco: string;
    dt_cadastro: string;
}

interface IModal {
    show: boolean;
    handleClose: () => void;
    item: IDados;
}

const InfoModal = (props: IModal) => {
    const { show, handleClose, item } = props;
    const [selectedItem, setSelectedItem] = useState<IDados>(item);

    useEffect(() => {
        setSelectedItem(item);
    }, [item]);

    return (
        <Modal show={show} handleClose={handleClose}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>
                    Detalhes do Item: {selectedItem.codigo}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <strong>Código:</strong> {selectedItem.codigo}
                </p>
                <p>
                    <strong>Descrição:</strong> {selectedItem.descricao}
                </p>
                <p>
                    <strong>Preço:</strong> {selectedItem.preco}
                </p>
                <p>
                    <strong>Data de Cadastro:</strong>{" "}
                    {selectedItem.dt_cadastro}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default InfoModal;
