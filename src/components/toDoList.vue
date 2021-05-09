<template>
  <div class="container">
    <h2 class="text-center mt-5">Lista de afazeres</h2>

    <div class="d-flex">
      <input
        data-cy="input-task"
        type="text"
        placeholder="Crie uma tarefa"
        class="form-control"
        v-model="task"
        @keyup.enter="adicionarTask()"
      />
    </div>

    <table class="table table-bordered mt-5">
      <thead>
        <tr>
          <th scope="col">Tarefa</th>
          <th scope="col">Status</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, indice) in listaDeveres" :key="indice">
          <td>
            <span  data-cy="tasks-row">{{ task.name }}</span>
          </td>
          <td>
            <span @click="trocarStatus(indice)">{{ task.status }}</span>
          </td>
          <td>
            <div data-cy="deletar-task" class="text-center" @click="deleteTarefa(indice)">
              <span class="fa fa-trash"></span>
            </div>
          </td>
        </tr>
        <td>
          <tr>
            <span>{{ contagem }} </span>
          </tr>
          <tr>
            {{
              contadorFeitos
            }}
          </tr>
        </td>
      </tbody>
    </table>
    <button :class="{ active: filter == 'all' }" @click="filter = 'all'">
      Todas
    </button>
    <button
      :class="{ active: filter == 'A fazer' }"
      @click="filter = 'A fazer'"
    >
      Ativos
    </button>
    <button :class="{ active: filter == 'Feito' }" @click="filter = 'Feito'">
      Feitas
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contadorFeitos: 0,
      contador: 0,
      task: "",
      tasks: [],
      filter: "all",
    };
  },

  computed: {
    contagem() {
      return this.listaDeveres.length;
    },
    listaDeveres() {
      if (this.filter == "all") {
        return this.tasks;
      } else if (this.filter == "A fazer") {
        return this.tasks.filter((aux) => aux.status == "A fazer");
      } else if (this.filter == "Feito") {
        return this.tasks.filter((aux) => aux.status == "Feito");
      }
      return this.tasks;
    },
  },

  methods: {
    adicionarTask() {
      if (!this.task.length < 1) {
        this.tasks.push({
          name: this.task,
          status: "A fazer",
        });
        this.task = "";
      }
      this.contador++;
    },

    trocarStatus(indice) {
      if (this.tasks[indice].status == "Feito") {
        this.tasks[indice].status = "A fazer";
        this.contadorFeitos--;
      } else if (this.tasks[indice].status == "A fazer") {
        this.tasks[indice].status = "Feito";
        this.contadorFeitos++;
      }
      // if (this.tasks[indice].status == 'Feito') {
      //   this.contadorFeitos ++;
      // }
    },

    deleteTarefa(indice) {
      this.tasks.splice(indice, 1);
      this.contador--;
    },
  },
};
</script>

<style>
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
}
.active {
  background: lightgreen;
}
</style>