export default [
  {
    path: 'problem-set',
    name: 'player.problem-set.list',
    component: () => import('@/views/player/problem-set/ProblemSetView.vue'),
  },

  {
    path: 'problem-set/:problem_set_id',
    name: 'player.problem-set.detail',
    children: [
      {
        path: '',
        name: 'player.problem.list',
        component: () => import('@/views/player/problem/ProblemView.vue')
      },
      {
        path: 'problem/:problem_id',
        name: 'player.problem.detail',
        component: () => import('@/views/player/problem/ProblemDetailView.vue')
      },
    ]
  }
];