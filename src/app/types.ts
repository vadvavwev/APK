// 用户类型
export interface User {
  id: string;
  phone: string;
  name: string;
  avatar?: string;
  desiredPosition: string;
  city: string;
  expectedSalary: string;
}

// 教育经历
export interface Education {
  id: string;
  school: string;
  major: string;
  degree: string;
  startDate: string;
  endDate: string;
}

// 工作经历
export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
}

// 简历
export interface Resume {
  educations: Education[];
  workExperiences: WorkExperience[];
}

// 职位
export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  city: string;
  salary: string;
  education: string;
  description: string;
  requirements: string[];
  benefits: string[];
  publishTime: string;
  views: number;
  hrName: string;
  hrPosition: string;
}

// 收藏
export interface Favorite {
  id: string;
  userId: string;
  jobId: string;
  createdAt: string;
}

// 投递记录
export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: 'pending' | 'viewed' | 'interview' | 'rejected';
  appliedAt: string;
}

// 筛选条件
export interface JobFilters {
  keyword?: string;
  city?: string;
  salaryRange?: string;
  education?: string;
}
