import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { toast } from 'sonner';
import { mockEducations, mockWorkExperiences } from '../data/mockData';
import { Plus, Trash2, GraduationCap, Briefcase } from 'lucide-react';
import type { Education, WorkExperience } from '../types';

export function Resume() {
  const [educations, setEducations] = useState<Education[]>(mockEducations);
  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>(mockWorkExperiences);
  const [editingEdu, setEditingEdu] = useState<string | null>(null);
  const [editingWork, setEditingWork] = useState<string | null>(null);

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      major: '',
      degree: '本科',
      startDate: '',
      endDate: '',
    };
    setEducations([...educations, newEdu]);
    setEditingEdu(newEdu.id);
  };

  const deleteEducation = (id: string) => {
    setEducations(educations.filter(e => e.id !== id));
    toast.success('已删除教育经历');
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducations(educations.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      description: '',
      startDate: '',
      endDate: '',
    };
    setWorkExperiences([...workExperiences, newWork]);
    setEditingWork(newWork.id);
  };

  const deleteWorkExperience = (id: string) => {
    setWorkExperiences(workExperiences.filter(w => w.id !== id));
    toast.success('已删除工作经历');
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: string) => {
    setWorkExperiences(workExperiences.map(w => 
      w.id === id ? { ...w, [field]: value } : w
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-6 max-w-4xl">
        {/* 教育经历 */}
        <Card className="mb-4 sm:mb-6">
          <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <GraduationCap className="size-4 sm:size-5" />
              教育经历
            </CardTitle>
            <Button onClick={addEducation} size="sm" className="h-8 sm:h-9">
              <Plus className="size-3 sm:size-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">添加</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {educations.map((edu, index) => (
              <div key={edu.id}>
                {index > 0 && <Separator className="mb-3 sm:mb-4" />}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm">学校</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          disabled={editingEdu !== edu.id}
                          placeholder="例如：北京大学"
                          className="h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm">专业</Label>
                        <Input
                          value={edu.major}
                          onChange={(e) => updateEducation(edu.id, 'major', e.target.value)}
                          disabled={editingEdu !== edu.id}
                          placeholder="例如：计算机科学与技术"
                          className="h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm">学历</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                          disabled={editingEdu !== edu.id}
                          placeholder="例如：本科"
                          className="h-9 sm:h-10"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm">时间段</Label>
                        <div className="flex gap-2">
                          <Input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                            disabled={editingEdu !== edu.id}
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                          <Input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                            disabled={editingEdu !== edu.id}
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 sm:ml-2">
                      {editingEdu === edu.id ? (
                        <Button size="sm" onClick={() => setEditingEdu(null)} className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm">
                          完成
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setEditingEdu(edu.id)} className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm">
                          编辑
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteEducation(edu.id)}
                        className="flex-1 sm:flex-none h-8 sm:h-9"
                      >
                        <Trash2 className="size-3 sm:size-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {educations.length === 0 && (
              <p className="text-center text-gray-500 py-6 sm:py-8 text-sm sm:text-base">暂无教育经历，点击上方按钮添加</p>
            )}
          </CardContent>
        </Card>

        {/* 工作经历 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Briefcase className="size-4 sm:size-5" />
              工作经历
            </CardTitle>
            <Button onClick={addWorkExperience} size="sm" className="h-8 sm:h-9">
              <Plus className="size-3 sm:size-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">添加</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            {workExperiences.map((work, index) => (
              <div key={work.id}>
                {index > 0 && <Separator className="mb-3 sm:mb-4" />}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 flex-1">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="space-y-1.5 sm:space-y-2">
                          <Label className="text-xs sm:text-sm">公司</Label>
                          <Input
                            value={work.company}
                            onChange={(e) => updateWorkExperience(work.id, 'company', e.target.value)}
                            disabled={editingWork !== work.id}
                            placeholder="例如：某互联网公司"
                            className="h-9 sm:h-10"
                          />
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                          <Label className="text-xs sm:text-sm">职位</Label>
                          <Input
                            value={work.position}
                            onChange={(e) => updateWorkExperience(work.id, 'position', e.target.value)}
                            disabled={editingWork !== work.id}
                            placeholder="例如：前端开发工程师"
                            className="h-9 sm:h-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm">工作描述</Label>
                        <Textarea
                          value={work.description}
                          onChange={(e) => updateWorkExperience(work.id, 'description', e.target.value)}
                          disabled={editingWork !== work.id}
                          placeholder="描述您的工作内容和主要成就"
                          rows={3}
                          className="text-xs sm:text-sm"
                        />
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                        <Label className="text-xs sm:text-sm">时间段</Label>
                        <div className="flex gap-2">
                          <Input
                            type="month"
                            value={work.startDate}
                            onChange={(e) => updateWorkExperience(work.id, 'startDate', e.target.value)}
                            disabled={editingWork !== work.id}
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                          <Input
                            type="month"
                            value={work.endDate}
                            onChange={(e) => updateWorkExperience(work.id, 'endDate', e.target.value)}
                            disabled={editingWork !== work.id}
                            className="h-9 sm:h-10 text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 sm:ml-2">
                      {editingWork === work.id ? (
                        <Button size="sm" onClick={() => setEditingWork(null)} className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm">
                          完成
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setEditingWork(work.id)} className="flex-1 sm:flex-none h-8 sm:h-9 text-xs sm:text-sm">
                          编辑
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteWorkExperience(work.id)}
                        className="flex-1 sm:flex-none h-8 sm:h-9"
                      >
                        <Trash2 className="size-3 sm:size-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {workExperiences.length === 0 && (
              <p className="text-center text-gray-500 py-6 sm:py-8 text-sm sm:text-base">暂无工作经历，点击上方按钮添加</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
