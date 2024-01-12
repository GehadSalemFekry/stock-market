import { NextApiResponse } from "next";

export const sendSuccess = (res: NextApiResponse, data: any) => {
  res.status(200).json(data);
};

export const sendError = (res: NextApiResponse, error: Error) => {
  res.status(500).json({ message: error.message });
};
