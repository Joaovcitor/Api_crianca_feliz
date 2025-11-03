export type CaregiverUpdate = {
  name?: string;
  cpf?: string;
  nis?: string;
  address?: string;
  district?: string;
  contact?: string;
  born?: string;
  pregnant?: boolean;
  weekPregnant?: number;
};

export type CaregiverUpdatePregnant = {
  pregnant: boolean;
  weekPregnant?: number;
};
