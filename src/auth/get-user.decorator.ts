import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req) => {
    return req.args[1].req.user;
})