import User from "../models/user.model";
import Skill from "../models/skill.model";
import Role from "../models/role.model";

User.belongsToMany(Skill, { through: "UserSkills", foreignKey: "user_id" });
Skill.belongsToMany(User, { through: "UserSkills", foreignKey: "skill_id" });

User.belongsToMany(Role, { through: "UserRoles", foreignKey: "user_id" });
Role.belongsToMany(User, { through: "UserRoles", foreignKey: "role_id" });
