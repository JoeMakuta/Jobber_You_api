import User from "../models/user.model";
import Skill from "../models/skill.model";

User.hasMany(Skill);
Skill.hasMany(User);
