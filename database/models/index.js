const User = require('./users');
const Task = require('./tasks');
const Project = require('./Project');

User.hasMany(Project, { // User can have many projects
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Project.belongsTo(User,{ // Projects can belong to users
    foreignKey: 'userId'
});

Project.hasMany(Task, { // Projects can have many tasks
    foreignKey: 'projectId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Task.belongsTo(Project, { // Tasks belong to Projects, but not users
    foreignKey: 'projectId'
});

module.exports = {
    User,
    Project,
    Task
};