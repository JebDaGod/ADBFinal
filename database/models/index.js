const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');

// Relationships
User.hasMany(Project, { foreignKey: 'userId' });
Project.belongsTo(User, { foreignKey: 'userId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = {
  User,
  Project,
  Task
};