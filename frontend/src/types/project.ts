type projectTypes = {
    name : string
    techStack : string
    description : string
    link : string
    phoneImage : File | null
    desktopImage : File | null
}

type projectFetchTypes= {
    id: number
    name: string
    link: string
    description: string
    techStack: string
    phoneImage: string
    desktopImage: string
    createdAt: string
}

export type  {projectTypes, projectFetchTypes}