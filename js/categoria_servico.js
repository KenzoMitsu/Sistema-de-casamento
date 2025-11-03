// Mapeamento de categorias de fornecedor para subcategorias de serviço
const servico_categorias = {
    "Buffet": ["Café da Manhã", "Almoço", "Jantar", "Churrasco", "Infantil", "Self-service"],
    "Confeiteiro": ["Confeitaria", "Confeitaria Artística", "Chocolataria", "Confeitaria Gourmet"],
    "Alfaiataria": ["Ternos", "Blazers", "Calças/Saias", "Vestidos", "Moderna/Slim", "Geral"],
    "Maquiador/Cabeleireiro/Salão de Beleza": ["Maquiagem", "Cortes Clássicos", "Escovista", "Cabelo da Noiva", "Manicure/Pedicure"],
    "DJ/Cantor": ["Música Clássica", "Música Romântica", "Trompetista", "Maestro", "Pianista", "Banda de Rock", "DJ Solo", "Cantor Solo"],
    "Decoração": ["Decoração"],
    "Fotógrafo": ["Fotografia", "Cabine Fotográfica", "Fotos de Casal", "Fotos de Ensaio", "Álbum"],
    "Transporte": ["Táxi", "Carro de Luxo", "Limousine"],
    "Espaço para eventos": ["Eventos Grandes", "Eventos Médios", "Eventos Pequenos"]
};

// Função para popular o select de categoria de serviço
function populateServiceCategorySelect(fornecedorCategoria, currentCategoria = null) {
    const select = $('#categoria');
    select.empty(); // Limpa opções existentes

    // Verifica se a categoria do fornecedor existe no mapeamento
    if (!servico_categorias[fornecedorCategoria]) {
        select.append('<option value="">Categoria de fornecedor inválida ou não encontrada</option>');
        return;
    }

    // Adiciona uma opção padrão
    select.append('<option value="">Selecione uma categoria de serviço</option>');

    // Adiciona as opções baseadas na categoria do fornecedor
    servico_categorias[fornecedorCategoria].forEach(subcategoria => {
        const option = $('<option></option>').val(subcategoria).text(subcategoria);
        if (currentCategoria && subcategoria === currentCategoria) {
            option.prop('selected', true); // Pré-seleciona a categoria atual (para edição)
        }
        select.append(option);
    });
}