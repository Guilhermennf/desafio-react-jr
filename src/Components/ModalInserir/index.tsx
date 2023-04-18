import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface IDados {
    codigo: number;
    descricao: string;
    preco: string;
    dt_cadastro: string;
}

interface ModalInserirProps {
    show: boolean;
    handleClose: () => void;
    handleCriar: (novoItem: IDados) => void;
}

const ModalInserir = ({
    show,
    handleClose,
    handleCriar,
}: ModalInserirProps) => {
    const [codigo, setCodigo] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [dtCadastro, setDtCadastro] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const novoItem: IDados = {
            codigo,
            descricao,
            preco,
            dt_cadastro: dtCadastro || new Date().toLocaleDateString(),
        };
        handleCriar(novoItem);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Novo Item</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="codigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="number"
                            value={codigo}
                            onChange={(event) =>
                                setCodigo(parseInt(event.target.value))
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="descricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            value={descricao}
                            onChange={(event) =>
                                setDescricao(event.target.value)
                            }
                        />
                    </Form.Group>
                    <Form.Group controlId="preco">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control
                            type="text"
                            value={preco}
                            onChange={(event) => setPreco(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="dt_cadastro">
                        <Form.Label>Data</Form.Label>
                        <Form.Control
                            type="date"
                            value={dtCadastro}
                            onChange={(event) =>
                                setDtCadastro(event.target.value)
                            }
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">
                        Criar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default ModalInserir;
