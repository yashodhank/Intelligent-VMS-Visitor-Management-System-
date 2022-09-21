import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthModule } from "@vms/auth";

import { User, UserSchema } from "./schema/user.schema";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { GetUserQueryHandler } from "./queries/handlers/getUser.handler";
import { SearchUserQueryHandler } from "./queries/handlers/searchUser.handler";
import { GetUnAuthUsersQueryHandler } from "./queries/handlers/getUnAuthUsers.handler";
import { GetUsersByTypeQueryHandler } from "./queries/handlers/getUsersByType.handler";

import { CreateUserCommandHandler } from "./commands/handlers/createUser.handler";
import { DeleteUserCommandHandler } from "./commands/handlers/deleteUser.handler";
import { AuthorizeUserCommandHandler } from "./commands/handlers/authorizeUser.handler";
import { DeauthorizeUserAccountCommandHandler } from "./commands/handlers/deauthorizeUserAccount.handler";
import { GetMaxInvitesPerResidentQueryHandler } from "./queries/handlers/getMaxInvitesPerResident.handler";
import { GetNumInvitesQueryHandler } from "./queries/handlers/getNumInvites.handler";
import { UpdateMaxInvitesCommandHandler } from "./commands/handlers/updateMaxInvites.handler";
import { UpdateMaxCurfewTimeCommandHandler } from "./commands/handlers/updateMaxCurfewTime.handler";
import { GetCurfewTimeQueryHandler } from "./queries/handlers/getCurfewTime.handler";
import { GetMaxCurfewTimePerResidentQueryHandler } from "./queries/handlers/getMaxCurfewTimePerResident.handler";
import { VisitorInviteModule } from "@vms/visitor-invite";
import { RewardsModule } from "@vms/rewards";
import { UpdateUserCommandHandler } from "./commands/handlers/updateUser.handler";
import { GetDaysWithVMSQueryHandler } from "./queries/handlers/getDaysWithVMS.handler";
import { IncreaseSuggestionsCommandHandler } from "./commands/handlers/increaseSuggestions.handler";
import { GetNumSuggestionsQueryHandler } from "./queries/handlers/getNumSuggestions.handler";
import { UpdatePrivilegesCommandHandler } from "./commands/handlers/updatePrivileges.handler";
import { GetMaxSleepoversPerResidentQueryHandler } from "./queries/handlers/getMaxSleepoversPerResident.handler";
import { GetNumSleepoversQueryHandler } from "./queries/handlers/getNumSleepovers.handler";

@Module({
    imports: [
        forwardRef(() => {return AuthModule}),
        forwardRef(() => {return RewardsModule}),
        forwardRef(() => {return VisitorInviteModule}),
        CqrsModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    providers: [
        UserService, 
        UserResolver, 
        GetUserQueryHandler, 
        CreateUserCommandHandler, 
        DeleteUserCommandHandler,
        SearchUserQueryHandler,
        GetUsersByTypeQueryHandler,
        GetUnAuthUsersQueryHandler,
        GetMaxInvitesPerResidentQueryHandler,
        GetNumInvitesQueryHandler,
        GetNumSuggestionsQueryHandler,
        UpdateMaxInvitesCommandHandler,
        GetMaxCurfewTimePerResidentQueryHandler,
        GetCurfewTimeQueryHandler,
        GetDaysWithVMSQueryHandler,
        UpdateMaxCurfewTimeCommandHandler,
        UpdateUserCommandHandler,
        UpdatePrivilegesCommandHandler,
        AuthorizeUserCommandHandler,
        DeauthorizeUserAccountCommandHandler,
        IncreaseSuggestionsCommandHandler,
        GetMaxSleepoversPerResidentQueryHandler,
        GetNumSleepoversQueryHandler,
        GetMaxSleepoversPerResidentQueryHandler,
    ],
    exports: [UserService],
})
export class UserModule {}
