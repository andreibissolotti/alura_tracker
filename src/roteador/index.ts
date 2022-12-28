import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import FormularioProjetos from '../views/projetos/FormularioProjetos.vue'
import ListaProjetos from '../views/projetos/ListaProjetos.vue'

const rotas: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas
  },
  {
    path: '/projetos',
    component: Projetos,
    children: [
      {
        path: '',
        name: 'Projetos',
        component: ListaProjetos
      },
      {
        path: 'novo',
        name: 'Novo Projetos',
        component: FormularioProjetos
      },
      {
        path: ':id/edit',
        name: 'Editar Projeto',
        component: FormularioProjetos,
        props: true
      }
    ]
  }
]

const roteador = createRouter({
  history: createWebHashHistory(),
  routes: rotas
})

export default roteador