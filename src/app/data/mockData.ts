import type { Job, Education, WorkExperience } from '../types';

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'React前端工程师',
    company: '字节跳动',
    companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop',
    city: '北京',
    salary: '20k-40k',
    education: '本科',
    description: '负责字节跳动核心产品的前端开发工作，参与产品架构设计和技术选型。要求熟练掌握React、TypeScript等前端技术栈，有大型项目经验。',
    requirements: [
      '3年以上前端开发经验',
      '精通React、Vue等主流框架',
      '熟悉TypeScript、Webpack等工具',
      '有移动端H5开发经验优先'
    ],
    benefits: ['五险一金', '年终奖', '股票期权', '带薪年假', '免费三餐', '健身房'],
    publishTime: '2026-05-20',
    views: 1234,
    hrName: '李经理',
    hrPosition: '招聘经理'
  },
  {
    id: '2',
    title: 'Java后端开发工程师',
    company: '阿里巴巴',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    city: '杭州',
    salary: '25k-45k',
    education: '本科',
    description: '负责电商平台后端服务开发，参与系统架构设计和性能优化。需要有扎实的Java基础和分布式系统经验。',
    requirements: [
      '5年以上Java开发经验',
      '精通Spring Boot、MyBatis等框架',
      '熟悉MySQL、Redis等数据库',
      '有高并发系统设计经验'
    ],
    benefits: ['六险一金', '年终奖', '股票激励', '弹性工作', '下午茶'],
    publishTime: '2026-05-22',
    views: 2345,
    hrName: '王总监',
    hrPosition: 'HRBP'
  },
  {
    id: '3',
    title: 'Flutter移动端开发',
    company: '腾讯',
    companyLogo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
    city: '深圳',
    salary: '22k-38k',
    education: '本科',
    description: '负责腾讯系产品的移动端开发，使用Flutter进行跨平台开发。需要有良好的UI实现能力和性能优化经验。',
    requirements: [
      '2年以上移动端开发经验',
      '精通Flutter/Dart',
      '熟悉iOS/Android原生开发',
      '有上线应用经验'
    ],
    benefits: ['五险一金', '年终奖', '节日福利', '团建活动', '通勤补贴'],
    publishTime: '2026-05-25',
    views: 987,
    hrName: '张HR',
    hrPosition: '人力资源专员'
  },
  {
    id: '4',
    title: 'UI/UX设计师',
    company: '美团',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop',
    city: '北京',
    salary: '18k-30k',
    education: '本科',
    description: '负责美团APP的界面设计和用户体验优化，参与产品原型设计和视觉规范制定。',
    requirements: [
      '3年以上UI/UX设计经验',
      '精通Figma、Sketch等设计工具',
      '有移动端设计经验',
      '良好的审美和创新能力'
    ],
    benefits: ['五险一金', '补充医疗', '年终奖', '设计津贴', '免费午餐'],
    publishTime: '2026-05-24',
    views: 756,
    hrName: '刘经理',
    hrPosition: '招聘主管'
  },
  {
    id: '5',
    title: '产品经理',
    company: '京东',
    companyLogo: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=100&h=100&fit=crop',
    city: '北京',
    salary: '20k-35k',
    education: '本科',
    description: '负责京东电商平台产品规划和需求分析，推动产品迭代和优化。需要有电商行业经验。',
    requirements: [
      '3年以上产品经理经验',
      '熟悉电商业务流程',
      '良好的沟通协调能力',
      '数据分析能力强'
    ],
    benefits: ['五险一金', '年终奖', '股票期权', '员工购物优惠'],
    publishTime: '2026-05-26',
    views: 1456,
    hrName: '陈总',
    hrPosition: '人力资源总监'
  },
  {
    id: '6',
    title: 'Python后端工程师',
    company: '百度',
    companyLogo: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop',
    city: '北京',
    salary: '20k-35k',
    education: '本科',
    description: '负责百度AI平台的后端服务开发，参与机器学习模型的部署和优化。',
    requirements: [
      '3年以上Python开发经验',
      '熟悉Django/Flask框架',
      '了解机器学习基础',
      '有云平台开发经验优先'
    ],
    benefits: ['五险一金', '年终奖', '技术培训', '健康体检'],
    publishTime: '2026-05-23',
    views: 892,
    hrName: '赵HR',
    hrPosition: '人力资源专员'
  },
  {
    id: '7',
    title: '算法工程师',
    company: '小米',
    companyLogo: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&h=100&fit=crop',
    city: '北京',
    salary: '25k-50k',
    education: '硕士',
    description: '负责小米智能设备的算法研发，包括图像识别、语音识别等方向。需要有深度学习经验。',
    requirements: [
      '硕士及以上学历',
      '精通机器学习/深度学习',
      '熟悉TensorFlow/PyTorch',
      '有顶会论文发表经验优先'
    ],
    benefits: ['六险一金', '年终奖', '股票期权', '科研奖金', '小米设备福利'],
    publishTime: '2026-05-21',
    views: 2134,
    hrName: '孙经理',
    hrPosition: '技术招聘经理'
  },
  {
    id: '8',
    title: 'DevOps工程师',
    company: '滴滴出行',
    companyLogo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop',
    city: '北京',
    salary: '22k-40k',
    education: '本科',
    description: '负责公司基础设施的运维和自动化，保障服务的高可用性。需要熟悉云平台和容器技术。',
    requirements: [
      '3年以上运维经验',
      '熟悉Kubernetes、Docker',
      '精通Shell/Python脚本',
      '有大规模集群管理经验'
    ],
    benefits: ['五险一金', '年终奖', '打车补贴', '技术培训'],
    publishTime: '2026-05-27',
    views: 654,
    hrName: '周HR',
    hrPosition: 'HRBP'
  }
];

export const mockEducations: Education[] = [
  {
    id: '1',
    school: '北京大学',
    major: '计算机科学与技术',
    degree: '本科',
    startDate: '2018-09',
    endDate: '2022-06'
  }
];

export const mockWorkExperiences: WorkExperience[] = [
  {
    id: '1',
    company: '某互联网公司',
    position: '前端开发工程师',
    description: '负责公司主要产品的前端开发工作，参与技术选型和架构设计。使用React、TypeScript等技术栈开发了多个项目。',
    startDate: '2022-07',
    endDate: '2024-12'
  }
];
