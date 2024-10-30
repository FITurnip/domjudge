export default [
  {
    path: 'problem-set',
    name: 'admin.problem-set.list',
    component: () => import('@/views/admin/problem-set/ProblemSetView.vue'),
  },

  {
    path: 'problem-set/:problem_set_id',
    name: 'admin.problem-set.detail',
    children: [
      {
        path: '',
        name: 'admin.problem.list',
        component: () => import('@/views/admin/problem/ProblemView.vue')
      },
      {
        path: 'problem/:problem_id',
        name: 'admin.problem.detail',
        component: () => import('@/views/admin/problem/ProblemDetailView.vue')
      },
      {
        path: 'problem/create',
        name: 'admin.problem.create',
        component: () => import('@/views/admin/problem/ProblemDetailView.vue')
      }
    ]
  }
];