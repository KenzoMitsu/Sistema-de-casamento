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

        // --- 🟢 ALTERAÇÃO: Link de "Editar Perfil" Universal ---
        // Adicionado aqui para aparecer para TODOS os cargos (1, 2, 3 e 4)
        const editProfileLink = document.createElement('a');
        editProfileLink.href = 'editar_perfil.html';
        editProfileLink.textContent = 'Editar perfil';
        modalOptionsContainer.appendChild(editProfileLink);
        // -------------------------------------------------------

        if (cargo === '2') { // Se for FORNECEDOR
            
            // Nota: O link de perfil foi removido daqui pois já foi adicionado acima

            const editServiceLink = document.createElement('a');
            editServiceLink.href = 'cadastro_servico.html';
            editServiceLink.textContent = 'Cadastrar novo serviço';
            modalOptionsContainer.appendChild(editServiceLink);

            const myServicesLink = document.createElement('a');
            myServicesLink.href = 'meus_servicos.html'; 
            myServicesLink.textContent = 'Meus Serviços';
            modalOptionsContainer.appendChild(myServicesLink);

            const myPartyLink = document.createElement('a');
            myPartyLink.href = 'minhas_festas_foncer.html'; 
            myPartyLink.textContent = 'Minhas Festas';
            modalOptionsContainer.appendChild(myPartyLink);

        } else if (cargo === '1' || cargo === '3') { // Se for NOIVO ou CERIMONIALISTA

            // Nota: O antigo bloco que diferenciava editar_perfil vs editar_cerimonialista foi removido
            // pois agora todos usam o link universal acima.

            if (cargo === '1') { // Se for NOIVO
                const minhasFestasLink = document.createElement('a');
                minhasFestasLink.href = 'minhas_festas.html';
                minhasFestasLink.textContent = 'Minhas festas';
                modalOptionsContainer.appendChild(minhasFestasLink);
            }

            // Se for CERIMONIALISTA
            if (cargo === '3') {
                const editServiceLink = document.createElement('a');
                editServiceLink.href = 'cadastro_servico.html';
                editServiceLink.textContent = 'Cadastrar novo serviço';
                modalOptionsContainer.appendChild(editServiceLink);

                const myServicesLink = document.createElement('a');
                myServicesLink.href = 'meus_servicos.html';
                myServicesLink.textContent = 'Meus Serviços';
                modalOptionsContainer.appendChild(myServicesLink);

                const myPartyLink = document.createElement('a');
                myPartyLink.href = 'minhas_festas_foncer.html';
                myPartyLink.textContent = 'Minhas Festas';
                modalOptionsContainer.appendChild(myPartyLink);
            }

        } else if (cargo === '4') { // Se for ADMIN
            const listagemLink = document.createElement('a');
            listagemLink.href = 'listagem.html';
            listagemLink.textContent = 'Gerenciar Usuários';
            modalOptionsContainer.appendChild(listagemLink);

            const servicosLink = document.createElement('a');
            servicosLink.href = 'catalogo_servicos.html';
            servicosLink.textContent = 'Gerenciar Serviços';
            modalOptionsContainer.appendChild(servicosLink);

            const myPartyLink = document.createElement('a');
            myPartyLink.href = 'minhas_festas.html';
            myPartyLink.textContent = 'Minhas Festas';
            modalOptionsContainer.appendChild(myPartyLink);
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