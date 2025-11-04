document.addEventListener('DOMContentLoaded', () => {

    // --- Seletores e Elementos da DOM para Modal de Perfil ---
    const profileLink = document.getElementById('profileLink');
    const logoutModal = document.getElementById('logoutModal');
    
    // Seleciona o botão de fechar específico dentro da 'logoutModal'
    const closeModalButton = logoutModal ? logoutModal.querySelector('.close-button') : null;
    
    const modalOptionsContainer = document.getElementById('modalOptionsContainer');

    // Se os elementos essenciais não existirem, não continua
    if (!profileLink || !logoutModal || !closeModalButton || !modalOptionsContainer) {
        console.warn("Elementos da modal de perfil não encontrados. A funcionalidade pode estar inativa.");
        return; 
    }

    // --- Funções da Modal de Perfil ---

    /**
     * Lida com o processo de logout do usuário.
     */
    const handleLogout = () => {
        localStorage.clear();
        Swal.fire({
            title: 'Você saiu!',
            text: 'Sua sessão foi encerrada.',
            icon: 'info'
        }).then(() => {
            window.location.href = 'login.html'; 
        });
        closeModal();
    };

    /**
     * Fecha a modal de opções da conta.
     */
    const closeModal = () => {
        if (logoutModal) {
            logoutModal.style.display = 'none';
        }
    };

    /**
     * Abre e popula a modal de opções com base no cargo do usuário.
     */
    const openModal = () => {
        modalOptionsContainer.innerHTML = ''; // Limpa opções anteriores

        const cargo = localStorage.getItem('cargo');

        if (cargo === '2') { // Se for FORNECEDOR
            const editProfileLink = document.createElement('a');
            editProfileLink.href = 'editar_fornecedor.html';
            editProfileLink.textContent = 'Editar perfil';
            modalOptionsContainer.appendChild(editProfileLink);

            const editServiceLink = document.createElement('a');
            editServiceLink.href = 'cadastro_servico.html';
            editServiceLink.textContent = 'Cadastrar novo serviço';
            modalOptionsContainer.appendChild(editServiceLink);

            const myServicesLink = document.createElement('a');
            myServicesLink.href = 'meus_servicos.html'; // Redireciona para a página solicitada
            myServicesLink.textContent = 'Meus Serviços';
            modalOptionsContainer.appendChild(myServicesLink);

        } else if (cargo === '1' || cargo === '3') { // Se for NOIVO ou CERIMONIALISTA
            const editProfileLink = document.createElement('a');
            if (cargo === '1') { // Noivo
                editProfileLink.href = 'editar_usuarios.html';
            } else { // Cerimonialista
                editProfileLink.href = 'editar_cerimonialista.html';
            }
            editProfileLink.textContent = 'Editar perfil';
            modalOptionsContainer.appendChild(editProfileLink);
    
        } else if (cargo === '4') { // Se for ADMIN
            const listagemLink = document.createElement('a');
            listagemLink.href = 'listagem.html'; 
            listagemLink.textContent = 'Gerenciar Usuários';
            modalOptionsContainer.appendChild(listagemLink);

            const servicosLink = document.createElement('a');
            servicosLink.href = 'catalogo_servicos.html'; 
            servicosLink.textContent = 'Gerenciar Serviços';
            modalOptionsContainer.appendChild(servicosLink);
        }

        // Botão de Logout (comum a todos os cargos logados)
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Sair da conta';
        logoutButton.className = 'logout-btn';
        logoutButton.addEventListener('click', handleLogout);
        modalOptionsContainer.appendChild(logoutButton);

        // Exibe o modal
        logoutModal.style.display = 'flex';
    };

    // --- Adicionar Event Listeners ---

    // Abrir modal ao clicar no link de perfil
    profileLink.addEventListener('click', (event) => {
        event.preventDefault();
        openModal();
    });

    // Fechar modal ao clicar no 'X'
    closeModalButton.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora (no overlay)
    logoutModal.addEventListener('click', (event) => {
        // Verifica se o clique foi no próprio overlay (fundo)
        if (event.target === logoutModal) {
            closeModal();
        }
    });

});