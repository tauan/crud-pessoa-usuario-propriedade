import React from 'react'

const Form = props => {
    const {novoUsuario, setNovoUsuario, styles, editando, deletePessoa, activePessoa, desactivePessoa, submitForm, setIsOpen} = props

    return(
        <div className={styles.registerContainer}>
                <form onSubmit={submitForm}>
                    <span>Nome: </span>
                    <input type="text" value={novoUsuario.nome !== undefined ? novoUsuario.nome: "" } onChange={(e) => {setNovoUsuario({...novoUsuario, nome: e.target.value})}} required />
                    <span>Sobrenome: </span>
                    <input type="text" value={novoUsuario.sobrenome !== undefined ? novoUsuario.sobrenome: "" } onChange={(e) => {setNovoUsuario({...novoUsuario, sobrenome: e.target.value})}} required />
                    <span>CPF: </span>
                    <input type="text" value={novoUsuario.cpf !== undefined ? novoUsuario.cpf: "" } onChange={(e) => {setNovoUsuario({...novoUsuario, cpf: e.target.value})}} required />
                    <span>Selecione o tipo de perfil</span>
                    <select onChange={(e) => {setNovoUsuario({...novoUsuario, perfil: e.target.value})}}>
                        <option value="">Selecione um tipo de perfil</option>
                        <option value="produtor">Produtor</option>
                        <option value="tecnico">Técnico</option>
                        <option value="administrador">Administrador</option>
                    </select>


                    {
                        !novoUsuario.desativado_em && <span className={styles.danger} onClick={()=> desactivePessoa(novoUsuario.id)}>Desativar pessoa</span> 
                    }
                    {
                        novoUsuario.desativado_em && <span className={styles.danger} onClick={()=> activePessoa(novoUsuario.id)}>Ativar pessoa</span> 
                    }

                    {editando && ( <span className={styles.danger} onClick={()=> deletePessoa(novoUsuario.id)}>Deletar conta</span> )}
                    


                    <input type="submit" value={editando ? "Salvar alteração" : "Cadastrar"}/>
                    <div className={styles.cancel} onClick={() => { 
        console.log(novoUsuario); setIsOpen(false); setNovoUsuario({})} }>Cancelar</div>

                </form>
            </div>
    )
}

export default Form