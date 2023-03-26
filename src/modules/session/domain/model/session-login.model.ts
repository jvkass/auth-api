import * as mongoose from "mongoose";

export const SessionLoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user_id: { type: String, required: true },
  is_active: { type: Boolean, required: true },
  access_token: { type: String, required: false },
  refresh_token: { type: String, required: false },
});

export interface ISessionLogin {
  name: string;

  user_id: string;

  is_active: boolean;

  access_token?: string;

  refresh_token?: string;
}
