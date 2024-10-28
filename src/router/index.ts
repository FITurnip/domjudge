import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: import('@/views/auth/AuthView.vue')
    },

    // problem set
    {
      path: '/problem-set',
      name: 'problem-set',
      children: [
        { // list of problem set
          path: '',
          name: 'problem-set.list',
          component: import('@/views/problem-set/ProblemSetView.vue')
        },
        { // detail of problem set
          path: ':problem_set_id',
          name: 'problem-set.detail',
          children: [

            // problem
            { // list of problem
              path: '',
              name: 'problem.list',
              component: import('@/views/problem-set/detail/ProblemView.vue')
            },
            { // detail of problem, update data in here
              path: 'problem/:problem_id',
              name: 'problem.detail',
              component: import('@/views/problem-set/detail/ProblemDetailView.vue')
            },
            { // make new problem
              path: 'problem/create',
              name: 'problem.create',
              component: import('@/views/problem-set/detail/CreateProblemView.vue')
            },

          ]
        },
      ]
    },
  ]
})

export default router
