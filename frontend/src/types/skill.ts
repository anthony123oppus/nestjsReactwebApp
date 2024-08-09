type skillDataTypes = {
    name : string
    level : string
    yrsExperience : string
    image : File | null
}

type skillDataFetch = {
    id: number
    name: string
    level: string
    yrsExperience: number
    image: string
    createdAt: string
}

type metaTypes = {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }

type linksTypes = {
    first: string
    previous: string
    next: string
    last: string
  }

type skillsDataPagination = {
    items: skillDataFetch[]
    meta: metaTypes
    links: linksTypes
  }

export type {skillDataTypes, skillDataFetch, skillsDataPagination, metaTypes, linksTypes}