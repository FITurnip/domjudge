import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: import('@/views/auth/AuthView.vue')
    },

    {
      path: '/admin',
      name: 'admin',
      children: [
        // problem set
        {
          path: 'problem-set',
          name: 'admin.problem-set',
          children: [
            { // list of problem set
              path: '',
              name: 'admin.problem-set.list',
              component: import('@/views/problem-set/admin-view/ProblemSetView.vue')
            },
            { // detail of problem set
              path: ':problem_set_id',
              name: 'admin.problem-set.detail',
              children: [
    
                // problem
                { // list of problem
                  path: '',
                  name: 'admin.problem.list',
                  component: import('@/views/problem-set/admin-view/detail/ProblemView.vue')
                },
                { // detail of problem, update data in here
                  path: 'problem/:problem_id',
                  name: 'admin.problem.detail',
                  component: import('@/views/problem-set/admin-view/detail/ProblemDetailView.vue')
                },
                { // make new problem
                  path: 'problem/create',
                  name: 'admin.problem.create',
                  component: import('@/views/problem-set/admin-view/detail/ProblemDetailView.vue')
                },
    
              ]
            },
          ]
        },
      ]
    },    {
      path: '/admin',
      name: 'admin',
      children: [
        // problem set
        {
          path: 'problem-set',
          name: 'admin.problem-set',
          children: [
            { // list of problem set
              path: '',
              name: 'admin.problem-set.list',
              component: import('@/views/problem-set/admin-view/ProblemSetView.vue')
            },
            { // detail of problem set
              path: ':problem_set_id',
              name: 'admin.problem-set.detail',
              children: [
    
                // problem
                { // list of problem
                  path: '',
                  name: 'admin.problem.list',
                  component: import('@/views/problem-set/admin-view/detail/ProblemView.vue')
                },
                { // detail of problem, update data in here
                  path: 'problem/:problem_id',
                  name: 'admin.problem.detail',
                  component: import('@/views/problem-set/admin-view/detail/ProblemDetailView.vue')
                },
                { // make new problem
                  path: 'problem/create',
                  name: 'admin.problem.create',
                  component: import('@/views/problem-set/admin-view/detail/ProblemDetailView.vue')
                },
    
              ]
            },
          ]
        },
      ]
    },

    {
      path: '/player',
      name: 'player',
      component: import('@/views/problem-set/player-view/ProblemSetView.vue'),
    }
  ]
})

export default router
