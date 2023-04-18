import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface IDados {
    codigo: number;
    descricao: string;
    preco: string;
    dt_cadastro: string;
}

interface IEditarModalProps {
    show: boolean;
    handleFechar: () => void;
    item: IDados;
    handleEditar: (item: IDados) => void;
    setData: React.Dispatch<React.SetStateAction<IDados[]>>;
}

const EditarModal = (props: IEditarModalProps) => {
    const { show, handleFechar, item, handleEditar, setData } = props;

    const [codigo, setCodigo] = useState(item.codigo);
    const [descricao, setDescricao] = useState(item.descricao);
    const [preco, setPreco] = useState(item.preco);
    const [dt_cadastro, setDtCadastro] = useState(item.dt_cadastro);

    const handleSalvar = () => {
        const editedItem = { codigo, descricao, preco, dt_cadastro };
        handleEditar(editedItem);
        setData((prevData) =>
            prevData.map((item) =>
                item.codigo === editedItem.codigo ? editedItem : item
            )
        );
        handleFechar();
    };

    return (
        <Modal show={show} onHide={handleFechar}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Item: {item.codigo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCodigo">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o código"
                            value={codigo}
                            onChange={(e) => setCodigo(Number(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a descrição"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPreco">
                        <Form.Label>Preço</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o preço"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDtCadastro">
                        <Form.Label>Data de Cadastro</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a data de cadastro"
                            value={dt_cadastro}
                            onChange={(e) => setDtCadastro(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleFechar}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSalvar}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditarModal;
