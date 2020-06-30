
export default [
  {
    path: '/text',
    component: () => import('../pages/material/MaterialTextPage.vue'),
    meta: { title: '发布纯文字内容' }
  },
  {
    path: '/image',
    component: () => import('../pages/material/MaterialImagePage.vue'),
    meta: { title: '发布图片内容' }
  },
  {
    path: '/video',
    component: () => import('../pages/material/MaterialVideoPage.vue'),
    meta: { title: '发布短视频内容' }
  },
  {
    path: '/ads',
    component: () => import('../pages/material/MaterialAdsPage.vue'),
    meta: { title: '发布资讯' }
  },
  {
    path: '/review',
    component: () => import('../pages/material/MaterialReview.vue'),
    meta: { title: '内容审核' }
  },
  {
    path: '/commentsReview',
    component: () => import('../pages/material/MaterialCommentsReviewPage.vue'),
    meta: { title: '评论审核' }
  },

]