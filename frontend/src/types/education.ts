type educationTypes = {
  degree: string;
  schoolName: string;
  course: string;
  monthGraduated: string;
  yearGraduated: string;
  schoolAddress: string;
  schoolImage: File | null;
}

type degreeOptions = {
    id  : number
    degree : string
    createdAt : string
}

type educationFetchTypes = {
    id : number
    degree: degreeOptions;
    schoolName: string;
    course: string;
    monthGraduated: string;
    yearGraduated: string;
    schoolAddress: string;
    schoolImage: string
}

export type {educationTypes, educationFetchTypes, degreeOptions}
