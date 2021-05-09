describe("Teste de to-do-list UI", () => {
  //https://docs.cypress.io/guides/references/assertions#BDD-Assertions
  it("should return true when title componente is correct ", () => {
    cy.visit("/");
    cy.contains("Lista de afazeres").should("to.have.length", 1);
  });

  it("Should add a new task", () => {
    cy.visit("/");
    // get para pegar o elemento que deseja fazer a inserção exemplo input
    // type joga o que for escrito dentro do parenteses pro input
    // type {enter} para simular o keyup
    cy.get("[data-cy=input-task]")
      .type("Nova Tarefa")
      .type("{enter}");

    cy.get("[data-cy=tasks-row]").should("to.have.length", 1);
    cy.contains("Nova Tarefa").should("to.have.length", 1);
  });

  it("Should add a two tasks", () => {
    cy.visit("/");
    cy.get("[data-cy=input-task]")
      .type("Nova Tarefa")
      .type("{enter}");

    cy.get("[data-cy=input-task]")
      .type("Outra Tarefa")
      .type("{enter}");

    cy.get("[data-cy=tasks-row]").should("to.have.length", 2);
    cy.contains("Nova Tarefa").should("to.have.length", 1);
    cy.contains("Outra Tarefa").should("to.have.length", 1);
  });

  it("Should delete a task", () => {
    cy.visit("/");

    cy.get("[data-cy=input-task]")
      .type("Outra Tarefa")
      .type("{enter}");

    cy.get("[data-cy=deletar-task]").click();
  });
});
