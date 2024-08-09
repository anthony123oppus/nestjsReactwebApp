type addInfo = {
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  age: null | number;
  birthDate: string;
  devImage: File | null;
  devMotto: string;
};

type infoDataTypes = {
  id: number;
  username: string;
  password: string;
  createdAt: string;
  devInfo: {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    age: number;
    birthDate: string;
    gender: string;
    devMotto: string;
    devImage: string;
    createdAt: string;
  };
};

export type { addInfo, infoDataTypes };
