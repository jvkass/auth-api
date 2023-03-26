import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ISessionLogin } from "../domain/model/session-login.model";

@Injectable()
export class SessionRepository {
  constructor(
    @InjectModel("Session")
    private readonly SessionLoginModel: Model<ISessionLogin>,
  ) {}

  async save(doc: ISessionLogin): Promise<string> {
    const result = await new this.SessionLoginModel(doc).save();

    return result.id;
  }

  async inactiveSessionByUserId(userId: string): Promise<ISessionLogin | null> {
    const sessionLogin = await this.SessionLoginModel.findOne({
      user_id: userId,
    });

    sessionLogin!.is_active = false;

    await sessionLogin?.save();

    return sessionLogin;
  }
}
