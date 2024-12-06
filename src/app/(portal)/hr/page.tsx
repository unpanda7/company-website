'use client'

import React, { useEffect, useState } from 'react'
import { getRecruitmentList } from '@/app/_actions/company'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Recruitment } from '@/lib/validations/company'
import { cn } from '@/lib/utils'

interface JobCardProps {
  title: string
  description: string
  className?: string
}

const JobCard = ({ title, description, className }: JobCardProps) => {
  return (
    <Card className={cn("p-6 max-h-[400px] overflow-y-auto", className)}>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <div
        className="prose prose-sm max-w-none mb-6 text-gray-500 text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <Button className="w-40 mx-auto block">联系我们</Button>
    </Card>
  )
}

const HrPage = () => {
  const [jobList, setJobList] = useState<Recruitment[]>([])

  const getCompanyInfoData = async () => {
    const jobList = await getRecruitmentList()
    setJobList(jobList)
  }

  useEffect(() => {
    getCompanyInfoData()
  }, [])

  return (
    <div className='container mx-auto p-4'>
      <div className='text-center mx-auto mb-4'>
        <div className='text-2xl font-bold'>人才招聘</div>
        <div className='text-sm text-gray-500'>一只充满活力的队伍</div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {jobList.map((job) => (
          <JobCard key={job.id} title={job.title} description={job.content || ''} />
        ))}
      </div>
    </div>
  )
}

export default HrPage
