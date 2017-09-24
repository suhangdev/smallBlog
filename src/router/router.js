import VueRouter from "vue-router";
import article from '../components/article.vue'
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: article
    }, {
      path: '/article',
      component: (resolve) => {
        require(['../components/article.vue'], resolve)
      }
    }, {
      path: '/about',
      component: (resolve) => {
        require(['../components/about.vue'], resolve)
      }
    }, {
      path: '/articleDetail/:id',
      component: (resolve) => {
        require(['../components/articleDetail.vue'], resolve)
      }
    }, {
      path: '/admin/articleList',
      meta: {
        requireAuth: true
      },
      component: (resolve) => {
        require(['../components/admin/articleList.vue'], resolve)
      }
    }, {
      path: '/admin/articleEdit',
      meta: {
        requireAuth: true
      },
      component: (resolve) => {
        require(['../components/admin/articleEdit.vue'], resolve)
      }
    }, {
      path: '/admin/articleEdit/:id',
      meta: {
        requireAuth: true
      },
      component: (resolve) => {
        require(['../components/admin/articleEdit.vue'], resolve)
      }
    }, {
      path: '/admin/signin',
      component: (resolve) => {
        require(['../components/admin/signin.vue'], resolve)
      }
    }
  ]
});

router.beforeEach((to,from,next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {
    if (sessionStorage.getItem('username')) {
      next()
    } else {
      next({
        path: '/admin/signin',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
});

export default router
