import { Role } from "./auth";

export interface IResource {
  id: string;
  title: string;
  href: string;
  roles?: Role[];
  detailsHref?: string;
}
