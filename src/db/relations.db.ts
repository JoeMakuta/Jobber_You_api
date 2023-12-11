import User from "../models/user.model";
import Skill from "../models/skill.model";
import Role from "../models/role.model";
import Job from "../models/job.model";
import Location from "../models/location.model";

//Relation User and Skill
User.belongsToMany(Skill, { through: "user_skills", foreignKey: "user_id" });
Skill.belongsToMany(User, { through: "user_skills", foreignKey: "skill_id" });

//Relation User and Role
User.belongsToMany(Role, { through: "user_roles", foreignKey: "user_id" });
Role.belongsToMany(User, { through: "user_roles", foreignKey: "role_id" });

//Relation User and Job
User.hasMany(Job, { foreignKey: "poster_id", onDelete: "cascade" });
Job.belongsTo(User, { foreignKey: "job_id", onDelete: "cascade" });

//Relation Job and skill
Job.belongsToMany(Skill, { through: "job_skills", foreignKey: "job_id" });
Skill.belongsToMany(Job, { through: "job_skills", foreignKey: "skill_id" });

//Relation Job and Location
Job.belongsToMany(Location, { through: "job_locations", foreignKey: "job_id" });
Location.belongsToMany(Job, {
  through: "job_locations",
  foreignKey: "location_id",
});
