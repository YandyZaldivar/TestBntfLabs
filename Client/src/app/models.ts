import { SafeResourceUrl } from "@angular/platform-browser";

export interface SkillResult {
  response: SkillResponse;
}

interface SkillResponse {
  data: object[];
}

export interface UserResult {
  response: UserResponse;
}

interface UserResponse {
  data: User[];
}

export interface User {
  id: string;
  rut: number;
  name_complete: string;
  email: string;
  phone: string;
  birthdate: string;
  info: Info;

  skills: Skill[];
  skillNames: string[];
  skillValues: number[];
  chartDataSets: any[];

  format_image: number;
  url_image: string;
  safeUrl_image: SafeResourceUrl;
}

interface Info {
  profession: string;
  address: string;
}

interface Skill {
  name: string;
  value: number;
}

export interface Image {
  base64Data: string;
}
