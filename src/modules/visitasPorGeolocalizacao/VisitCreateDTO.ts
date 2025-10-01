export type VisitCreateDTO = {
  scheduledDate: string | Date;
  planId: number;
  childId?: number;
  caregiverId?: number;
};
