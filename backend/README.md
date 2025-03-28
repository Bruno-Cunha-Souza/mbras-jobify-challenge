# Back-End do Jobify

Como a [API que contem as vagas](https://github.com/remotive-com/remote-jobs-api) possue algumas limitações como a ausencia de um EndPoint que funcione como um GetterID, a do recurso de pagination para melhor desempenho geral entre outras questões.

Deselvolvi esta nova API para alem de salvar os itens marcados como "favoritos" pelo usuario, ela consultara a API do remotive para salvar as vagas ja cadastradas e com a implementação de uma rotina ira verificar periodicamente por novas vagas.

## Funcionalidades Propostas no Desafio

- **Permitir que os usuários possam "favoritar" vagas e armazená-las em um banco de dados.**

## Funcionalidades Adicionais

- **Cadastro e login de Usuario**
- **Armazenamento das vagas cadastradas na API Remotive**
- **Rotina de verificação periodica de novas vagas**
