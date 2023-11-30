import User from "../models/user.model";
import Skill from "../models/skill.model";
import Role from "../models/role.model";

User.belongsToMany(Skill, { through: "UserSkills" });
Skill.belongsToMany(User, { through: "UserSkills" });

User.belongsToMany(Role, { through: "UserRoles" });
Role.belongsToMany(User, { through: "UserRoles" });
