export interface ISubject {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISubjectCreate {
  title: string;
  image?: string;
}
