export type EventReqDto = {
  name: string;
  story: string;
  status: "ended" | "ongoing" | "upcoming";
  startDate: Date;
  endDate: Date;
};

export type EventResDto = {
  id: number;
  name: string;
  story: string;
  status: "ended" | "ongoing" | "upcoming";
  startDate: Date;
  endDate: Date;
};
