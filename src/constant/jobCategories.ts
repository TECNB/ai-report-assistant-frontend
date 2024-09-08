import { ref } from 'vue';

export const jobCategories = ref([
    {
        title: '信息技术 (IT)',
        jobs: ['软件开发', '前端开发工程师', '全栈开发工程师'],
        iconClass: 'fa-laptop',
        iconColor: 'text-blue-500'
    },
    {
        title: '市场营销',
        jobs: ['市场策划', '内容营销', '品牌经理'],
        iconClass: 'fas fa-chart-line',
        iconColor: 'text-green-500'
    },
    {
        title: '设计',
        jobs: ['UI/UX 设计师', '平面设计师', '插画师'],
        iconClass: 'fas fa-pencil-ruler',
        iconColor: 'text-purple-500'
    },
    {
        title: '人力资源',
        jobs: ['招聘专员', '培训经理', '员工关系顾问'],
        iconClass: 'fas fa-users',
        iconColor: 'text-yellow-500'
    },
    {
        title: '金融服务',
        jobs: ['金融分析师', '投资经理', '会计师'],
        iconClass: 'fas fa-chart-bar',
        iconColor: 'text-indigo-500'
    },
    {
        title: '教育与培训',
        jobs: ['教师', '教育顾问', '培训师'],
        iconClass: 'fas fa-chalkboard-teacher',
        iconColor: 'text-red-500'
    },
    {
        title: '法律服务',
        jobs: ['律师', '法律顾问', '法务专员'],
        iconClass: 'fas fa-gavel',
        iconColor: 'text-gray-700'
    },
    {
        title: '健康与保健',
        jobs: ['护士', '理疗师', '营养师'],
        iconClass: 'fas fa-heartbeat',
        iconColor: 'text-pink-500'
    },
    {
        title: '工程与建筑',
        jobs: ['土木工程师', '机械工程师', '建筑师'],
        iconClass: 'fas fa-hard-hat',
        iconColor: 'text-orange-500'
    },
    {
        title: '公共关系',
        jobs: ['公关专员', '品牌公关', '媒体关系经理'],
        iconClass: 'fas fa-bullhorn',
        iconColor: 'text-teal-500'
    },
    {
        title: '客户服务',
        jobs: ['客户服务代表', '客户支持经理', '售后服务专员'],
        iconClass: 'fas fa-headset',
        iconColor: 'text-blue-700'
    },
    {
        title: '销售与业务发展',
        jobs: ['销售代表', '业务拓展经理', '渠道经理'],
        iconClass: 'fas fa-handshake',
        iconColor: 'text-green-700'
    }
]);