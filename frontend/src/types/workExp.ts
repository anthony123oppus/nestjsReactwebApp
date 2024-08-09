type WorkExperienceTypes = {
    companyName : string
    jobTitle : string
    employmentType : string
    startMonth : string
    startYear : string
    untilPresent : 'Present' | 'Not Present'
    endMonth : string
    endYear : string
    jobDescription : string
    monthlySalary : number | null
}

type WorkExpDataFetch = {
    id: number
    monthlySalary: number
    companyName: string
    jobTitle: string
    employmentType: string
    startMonth: string
    startYear: string
    untilPresent: string
    endMonth: string
    endYear: string
    jobDescription: string
    createdAt: string
  }

export type { WorkExperienceTypes, WorkExpDataFetch}