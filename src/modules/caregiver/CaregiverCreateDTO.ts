export type CaregiverCreate = {
  name: string;
  cpf: string;
  nis?: string;
  address: string;
  district: string;
  contact?: string;
  born: string;
  pregnant?: boolean;
};
